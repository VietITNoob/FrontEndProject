import './Footer.css';
import {
  FOOTER_COLUMNS,
  FOOTER_NOTES,
  FOOTER_LEGAL_LINKS,
} from './footer.data';

const Footer = () => {
  return (
    <footer className="apple-footer">
      <div className="footer-content">

        {/* NOTES */}
        <div className="footer-notes">
          {FOOTER_NOTES.map((note, index) => (
            <p key={index}>{note}</p>
          ))}
        </div>

        {/* LINKS */}
        <div className="footer-links">
          {FOOTER_COLUMNS.map((col, colIndex) => (
            <div key={colIndex} className="footer-column">
              {col.sections.map((section) => (
                <div key={section.title} className="column-section">
                  <span className="column-title">{section.title}</span>
                  <ul className="column-list">
                    {section.links.map((link) => (
                      <li key={link.href} className="column-item">
                        <a href={link.href} className="column-link">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <div className="footer-legal">
            <div className="copyright">
              Bản quyền © 2024 CodeStore Inc. Bảo lưu mọi quyền.
            </div>
            <ul className="legal-links">
              {FOOTER_LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="legal-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-locale">
            <span>Việt Nam</span>
            <span className="divider">|</span>
            <span>Tiếng Việt</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
