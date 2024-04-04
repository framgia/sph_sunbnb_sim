<?php

namespace App\Models;

use App\Enums\Reason;
use App\Enums\ReportStatus;
use App\Http\Requests\V1\ReportRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Report extends Model {
    use HasFactory;

    protected $fillable = [
        'title', 'content', 'status', 'reason',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function listing() {
        return $this->belongsTo(Listing::class);
    }

    public function admin() {
        return $this->belongsTo(Admin::class);
    }

    public static function instantiateReport(ReportRequest $request) {

        $reportData = $request->all();
        $reportData['status'] = ReportStatus::OPEN;

        return $reportData;
    }

    public static function getReports(Request $request) {
        $perPage = $request->query('per_page', 8);
        $status = $request->query('status', 'open');
        $reason = $request->query('reason');
        $type = $request->query('type');

        $query = static::where('status', $status)
            ->with([
                'user',
                'listing' => function ($query) {
                    $query->with('user');
                },
            ]);

        if ($reason !== null && in_array($reason, Reason::getConstants())) {
            $reasonKey = array_search($reason, Reason::getConstants());
            $query->where('reason', $reasonKey);
        }

        if ($type !== null && ($type == Accommodation::class || $type == Experience::class)) {
            $query->whereHas('listing', function ($query) use ($type) {
                $query->where('listable_type', $type);
            });
        }

        return $query->paginate($perPage);
    }

    public static function reportResponse($reports) {
        return [
            'success' => true,
            'reports' => $reports->items(),
            'pagination' => [
                'current_page' => $reports->currentPage(),
                'per_page' => $reports->perPage(),
                'total' => $reports->total(),
                'next_page_url' => $reports->nextPageUrl(),
                'path' => $reports->path(),
                'prev_page_url' => $reports->previousPageUrl(),
                'to' => $reports->lastItem(),
            ],
        ];
    }

    public static function createReport(ReportRequest $request, $listingId) {
        $reportData = self::instantiateReport($request);
        $report = new Report($reportData);

        $report->listing()->associate(Listing::find($listingId));
        $report->user()->associate(auth()->user());
        $report->save();

        return $report;
    }

    public function closeReport() {

        $this->admin()->associate(auth()->user()->admin);
        $this->update([
            'status' => 'closed',
            'admin_id' => $this->input('admin_id'),
        ]);

    }
}
