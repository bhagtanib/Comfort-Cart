import "../styles/Footer.css";
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-rows">
        {Array(4)
          .fill("!")
          .map((_, i) => (
            <div className="footer-row-content">
              <p>Careers </p>
              <p>Amazon Newsletter</p>
              <p>About Amazon </p>
              <p>Sustainability</p>
              <p>Press Center</p>
              <p>Investor Relations</p>
              <p>Amazon Devices</p>
              <p>Amazon Science</p>
            </div>
          ))}
      </div>
      <p className="footer-text">
        Conditions of UsePrivacy NoticeInterest-Based Ads© 1996-2022,
        Amazon.com, Inc. or its affiliates
      </p>
    </div>
  );
};
export default Footer;
