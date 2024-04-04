<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\ReportRequest;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ReportController extends Controller {
    public function index(Request $request) {
        $reports = Report::getReports($request);

        return response()->json(Report::reportResponse($reports), Response::HTTP_OK);
    }

    public function store(ReportRequest $request, $listingId) {
        $report = Report::createReport($request, $listingId);

        return response()->json(['success' => true, 'message' => 'Report created successfully'], Response::HTTP_CREATED);
    }

    public function update($id) {
        $report = Report::findOrFail($id);
        $report->closeReport();

        return response()->json(['success' => true, 'message' => 'Report closed successfully'], Response::HTTP_OK);
    }

    public function destroy($id) {
        $report = Report::findOrFail($id);
        $report->delete();

        return response()->json(['success' => true, 'message' => 'Report deleted successfully'], Response::HTTP_OK);
    }
}
