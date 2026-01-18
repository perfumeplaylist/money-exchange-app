import { GlobalErrorBoundary, TopErrorBoundary } from "@/shared";
import Provider from "./provider/Provider";

const App = () => {
  return (
    <TopErrorBoundary>
      <GlobalErrorBoundary>
        <Provider />
      </GlobalErrorBoundary>
    </TopErrorBoundary>
  );
};

export default App;
