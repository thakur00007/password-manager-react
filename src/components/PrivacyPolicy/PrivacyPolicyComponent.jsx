function PrivacyPolicyComponent() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        This Password Manager application ("the App") is developed solely for{" "}
        <strong>educational</strong> and{" "}
        <strong>personal hobby purposes</strong>. It is not intended for
        commercial use, production environments, or storing sensitive personal
        information in real-world scenarios.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        1. No Commercial Intent
      </h2>
      <p className="mb-4">
        This App is a personal project designed to demonstrate technical skills
        in web development, encryption, and state management using modern
        technologies. It is <strong>not</strong> affiliated with any
        organization and is not offered as a product or service.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        2. Data Handling & Storage
      </h2>
      <p className="mb-4">
        While the App allows users to save encrypted passwords and related
        information locally or via APIs, any such data is stored as part of a
        test or demo. Users are advised{" "}
        <strong>not to store any real or sensitive passwords</strong> in this
        application.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        3. Encryption & Security
      </h2>
      <p className="mb-4">
        Passwords may be encrypted using client-side or server-side logic for
        demonstration purposes. However, no guarantees are made about the
        strength, integrity, or compliance of the encryption used.{" "}
        <strong>This is not a security-certified tool.</strong>
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Data Sharing</h2>
      <p className="mb-4">
        This App does not share, sell, or distribute any user data. All
        interactions are self-contained, and no third-party tracking or
        analytics services are used.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        5. User Responsibility
      </h2>
      <p className="mb-4">
        Users who voluntarily input any data are fully responsible for its use.
        The developer is not responsible for any data loss, misuse, or
        consequences arising from the use of this application.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">6. No Liability</h2>
      <p className="mb-4">
        The App is provided “as-is” without any warranties or guarantees. The
        developer is not liable for any damages or issues arising from its use.
        It should not be considered production-grade software.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">7. Updates</h2>
      <p className="mb-4">
        This Privacy Policy may be updated to reflect clarification or changes
        to the scope of this project. Any updates will be posted here.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">8. Contact</h2>
      <p className="mb-4">
        For any questions or concerns regarding this project, please contact the
        developer at:{" "}
        <a
          target="_blank"
          href="https://meetanmoy.in"
          className="text-blue-600 underline"
        >
          meetanmoy.in
        </a>
      </p>

      <p className="text-sm text-gray-500 mt-8">Last updated: July 2025</p>
    </div>
  );
}

export default PrivacyPolicyComponent;
