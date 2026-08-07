import { makeLegalPage } from "@/lib/legalPage";

const { generateMetadata, Page } = makeLegalPage("cookies");
export { generateMetadata };
export default Page;
