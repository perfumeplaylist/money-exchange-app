import { PageHeader } from "@/shared";
import HistoryTable from "@/features/search-exchange-history/ui/history-table";

const HistoryPage = () => {

  return (
    <section className="w-full">
      <PageHeader
        title="환전 내역"
        description="환전 내역을 확인할 수 있습니다."
      />
      <div className="mt-6">
        <HistoryTable />
      </div>
    </section>
  );
};

export default HistoryPage;
