const Footer = () => {
  return (
    <div className="bg-gray-950 text-white py-5">
      <h1 className="text-center">
        <span className="font-sans font-semibold">
          ©️{new Date().getFullYear()},
        </span>
        <span className="font-serif"> All rights reserved by sh@nto</span>
      </h1>
    </div>
  );
};

export default Footer;
