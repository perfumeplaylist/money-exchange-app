import { GlobalErrorBoundary } from "@/shared";
import Provider from "./provider/Provider";

const App = () => {
  return (
    <GlobalErrorBoundary>
      <Provider />
    </GlobalErrorBoundary>
  );
};

export default App;
