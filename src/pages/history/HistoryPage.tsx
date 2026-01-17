// import { useQuery } from "@tanstack/react-query";
// import history_query_option from "@/features/history/model/query.option";
import { PageHeader } from "@/shared";
import HistoryTable from "@/features/history/ui/HistoryTable/HistoryTable";
import { mockHistoryData } from "@/features/history/ui/HistoryTable/mockData";

const HistoryPage = () => {
  // 디자인 테스트용: mock 데이터 사용
  // const { data, isLoading, isError } = useQuery(
  //   history_query_option.getHistory
  // );

  // if (isLoading) {
  //   return (
  //     <>
  //       <PageHeader
  //         title="환전 내역"
  //         description="환전 내역을 확인할 수 있습니다."
  //       />
  //       <div className="mt-6 text-center text-text-secondary">로딩 중...</div>
  //     </>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <>
  //       <PageHeader
  //         title="환전 내역"
  //         description="환전 내역을 확인할 수 있습니다."
  //       />
  //       <div className="mt-6 text-center text-text-secondary">
  //         데이터를 불러오는 중 오류가 발생했습니다.
  //       </div>
  //     </>
  //   );
  // }

  // const historyData = data?.data || [];
  const historyData = mockHistoryData;

  return (
    <section className="w-full">
      <PageHeader
        title="환전 내역"
        description="환전 내역을 확인할 수 있습니다."
      />
      <div className="mt-6">
        <HistoryTable data={historyData} />
      </div>
    </section>
  );
};

export default HistoryPage;
