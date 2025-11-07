import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ChatSaude from "./pages/ChatSaude";
import Localizar from "./pages/Localizar";
import Educacao from "./pages/Educacao";
import PontosColeta from "./pages/PontosColeta";
import Exames from "./pages/Exames";
import Atividades from "./pages/Atividades";
import SaudeMental from "./pages/SaudeMental";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<ChatSaude />} />
          <Route path="/localizar" element={<Localizar />} />
          <Route path="/educacao" element={<Educacao />} />
          <Route path="/pontos-coleta" element={<PontosColeta />} />
          <Route path="/exames" element={<Exames />} />
          <Route path="/atividades" element={<Atividades />} />
          <Route path="/saude-mental" element={<SaudeMental />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
