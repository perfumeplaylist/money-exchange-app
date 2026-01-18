import { memo, Suspense } from "react";
import { HistoryTableSkeleton, HistoryTableContent } from "@/features/search-exchange-history";
import { SectionErrorBoundary, ApiError } from "@/shared";

const HistoryTableSection = memo(() => {
  return (
    <SectionErrorBoundary errorType={ApiError}>
      <Suspense fallback={<HistoryTableSkeleton />}>
        <HistoryTableContent />
      </Suspense>
    </SectionErrorBoundary>
  );
});


export default HistoryTableSection;
