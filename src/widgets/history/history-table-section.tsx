import { memo, Suspense } from "react";
import { HistoryTableSkeleton, HistoryTableContent } from "@/features/search-exchange-history";
import { SectionErrorBoundary, DomainError } from "@/shared";

const HistoryTableSection = memo(() => {
  return (
    <SectionErrorBoundary errorType={DomainError}>
      <Suspense fallback={<HistoryTableSkeleton />}>
        <HistoryTableContent />
      </Suspense>
    </SectionErrorBoundary>
  );
});


export default HistoryTableSection;
