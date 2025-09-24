import Container from "./ui/container";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-4 mt-auto">
      <Container>
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 text-center sm:text-left">
          <span className="text-sm">&copy; {new Date().getFullYear()} Eh Fake</span>
          <a
            href="https://github.com/unb-mds/2025-2-Eh_Fake"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline mt-2 sm:mt-0"
          >
            Projeto Eh Fake
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;