import { makeLegalPage } from "@/lib/legalPage";

const { generateMetadata, Page } = makeLegalPage("terms");
export { generateMetadata };
export default Page;
