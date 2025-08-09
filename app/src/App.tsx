import Page from "./dawn-ui/components/Page";
import Container from "./dawn-ui/components/Container";
import AppNavbar from "./Navbar";

export default function App() {
  return (
    <>
      <AppNavbar />
      <Page>
        <Container title="Hey!">
          <p>Welcome to the template dawn-ui project.</p>
        </Container>
      </Page>
    </>
  );
}
