import "./footer.css";

function Footer() {
  const date = new Date();
  const currentMinutes = date.getHours() * 60 + date.getMinutes();

  const storeOpen = 10 * 60; // 10:00 AM
  const storeClose = 22 * 60; // 10:00 PM

  const isOpen = currentMinutes > storeOpen && currentMinutes < storeClose;

  return (
    <footer className="footer">
      {isOpen ? (
        <p className="open-msg">
          We're currently <span className="open">open</span> come grab a slice!
        </p>
      ) : (
        <p className="closed-msg">
          Sorry, we're <span className="closed">closed</span> — back at 10:00 AM tomorrow!
        </p>
      )}
    </footer>
  );
}

export default Footer;
