import React from "react";

function Disclaimer() {
  return (
    <div className="flex justify-center pt-5 ">
      {/* disclaimer */}
      <p className="text-sm font-semibold leading-6 max-w-96">
        <span className="text-red-700 text-xl">**Disclaimer:</span> This
        password generator application is intended for demonstration and
        educational purposes only. It is not recommended for generating or
        storing sensitive information. <br /> This service runs on a free-tier
        of a cloud provider and is not designed for commercial use. Saved
        passwords and user data may be deleted at any time. Please refrain from
        using this service to store sensitive or critical information.
        
      </p>
    </div>
  );
}

export default Disclaimer;
