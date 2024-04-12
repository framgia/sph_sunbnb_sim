<?php

namespace App\Models;

use App\Enums\Reason;
use App\Enums\ReportStatus;
use App\Http\Requests\V1\ReportRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class Report extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'content', 'status', 'reason',
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
        $search = $request->query('search');
        $sort = $request->query('sort', 'desc');

        $query = static::where('status', $status)
            ->with([
                'user',
                'admin',
                'listing' => function ($query) {
                    $query->with('user');
                },
            ]);

        if ($reason !== null) {
            $reasonConstants = Reason::getConstants();
            $reasonValue = $reasonConstants[Str::upper($reason)];
            $query->where('reason', $reasonValue);
        }

        if ($search !== null) {
            $query->where(function ($query) use ($search) {
                $query->whereHas('user', function ($query) use ($search) {
                    $query->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%$search%"]);
                })
                    ->orWhereHas('listing', function ($query) use ($search) {
                        $query->where('name', 'like', "%$search%");
                    });
            });
        }

        if ($type !== null) {
            if ($type == 'accommodation') {
                $query->whereHas('listing', function ($query) {
                    $query->where('listable_type', Accommodation::class);
                });
            } elseif ($type == 'experience') {
                $query->whereHas('listing', function ($query) {
                    $query->where('listable_type', Experience::class);
                });
            }
        }

        $query->orderBy('created_at', $sort);

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

        $this->admin()->associate(auth()->user());
        $this->update([
            'status' => 'closed',
        ]);
    }
}
