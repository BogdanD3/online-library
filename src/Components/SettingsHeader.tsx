import { useState, useEffect } from "react";

const SettingsHeader = () => {
  const [activeLink, setActiveLink] = useState<string>(
    window.location.pathname
  );

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };

  return (
    <div className="settings-header">
      <a
        href="/settings"
        className={`settings-header-link ${
          activeLink === "/settings" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("/settings")}
      >
        Polisa
      </a>
      <a
        href="kategorije"
        className={`settings-header-link ${
          activeLink === "going" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("going")}
      >
        Kategorije
      </a>
      <a
        href="zanrovi"
        className={`settings-header-link ${
          activeLink === "zanrovi" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("zanrovi")}
      >
        Zanrovi
      </a>
      <a
        href="izdavac"
        className={`settings-header-link ${
          activeLink === "izdavac" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("izdavac")}
      >
        Izdavac
      </a>
      <a
        href="povez"
        className={`settings-header-link ${
          activeLink === "povez" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("povez")}
      >
        Povez
      </a>
      <a
        href="format"
        className={`settings-header-link ${
          activeLink === "format" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("format")}
      >
        Format
      </a>
      <a
        href="pismo"
        className={`settings-header-link ${
          activeLink === "pismo" ? "active" : ""
        }`}
        onClick={() => handleLinkClick("pismo")}
      >
        Pismo
      </a>
      <style>{`
        .settings-header {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #ccc;
  padding-bottom: 1rem;
}

.settings-header-link {
  color: #1890ff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  transition: color 0.3s, border-bottom 0.3s;
  border-bottom: 2px solid transparent;
  margin: 0 1rem;
}

.settings-header-link:hover,
.settings-header-link:focus {
  color: #40a9ff;
  border-bottom: 2px solid #40a9ff;
}

.settings-header-link.active {
  color: #40a9ff;
  border-bottom: 2px solid #40a9ff;
}

        `}</style>
    </div>
  );
};
export default SettingsHeader;
