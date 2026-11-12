"use client";

import React, { useEffect } from "react";

export type ModalType = "terms" | "privacy" | "refund" | null;

interface LegalModalsProps {
  activeModal: ModalType;
  onClose: () => void;
}

export function LegalModals({ activeModal, onClose }: LegalModalsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModal) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal, onClose]);

  if (!activeModal) return null;

  return (
    <>
      {/* Terms & Conditions Modal */}
      {activeModal === "terms" && (
        <div
          className="modal-overlay active"
          id="terms-modal"
          aria-hidden={false}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="terms-title">
            <button className="modal-close" id="terms-close" aria-label="Close Terms" onClick={onClose}>
              ✕
            </button>
            <div className="modal-body">
              <h2 id="terms-title">Terms and Conditions</h2>
              <p>Welcome to <strong>ExoQuest</strong>!</p>
              <p>These terms and conditions outline the rules and regulations for the use of ExoQuest&apos;s Website and Platform.</p>
              <p>
                By accessing this website, you agree to accept these terms and conditions. Do not continue to use ExoQuest if you do not agree with all of the terms and conditions stated on this page.
              </p>

              <h3>1. Use of the Platform</h3>
              <p>
                ExoQuest is a cybersecurity Capture The Flag (CTF) and learning platform designed for cybersecurity education, training, research, and competitions.
              </p>
              <p>By using ExoQuest, you agree to use the platform responsibly and only for lawful and authorized purposes.</p>
              <p>You must not use ExoQuest to:</p>
              <ul>
                <li>Attack or compromise systems that are not part of an authorized ExoQuest challenge.</li>
                <li>Attempt to access another user&apos;s account or private information.</li>
                <li>Disrupt, damage, or overload ExoQuest infrastructure.</li>
                <li>Attempt to gain unauthorized administrative access.</li>
                <li>Interfere with other participants or their challenge environments.</li>
                <li>Use the platform for illegal activities.</li>
                <li>Upload malicious content intended to harm ExoQuest or its users.</li>
                <li>Attempt to manipulate scores, flags, submissions, or leaderboards.</li>
              </ul>
              <p>Any security testing performed through ExoQuest must remain within the scope explicitly provided by the relevant challenge.</p>

              <h3>2. CTF Challenges</h3>
              <p>ExoQuest may provide cybersecurity challenges involving areas such as:</p>
              <ul>
                <li>Web exploitation</li>
                <li>Cryptography</li>
                <li>Forensics</li>
                <li>Reverse engineering</li>
                <li>Binary exploitation</li>
                <li>OSINT</li>
                <li>Steganography</li>
                <li>Networking</li>
                <li>Other cybersecurity-related topics</li>
              </ul>
              <p>Some challenges may intentionally contain vulnerable applications, files, services, or systems.</p>
              <p>
                Participants are authorized to interact with these systems only for the purpose of solving the corresponding challenge and only within the scope provided by ExoQuest.
              </p>
              <p>
                Authorization to attack a challenge environment does not provide authorization to attack ExoQuest&apos;s production infrastructure, other users, or unrelated third-party systems.
              </p>

              <h3>3. Accounts</h3>
              <p>Certain features of ExoQuest may require you to create an account.</p>
              <p>When creating an account, you agree to:</p>
              <ul>
                <li>Provide accurate information.</li>
                <li>Keep your account credentials secure.</li>
                <li>Not share your account with another person.</li>
                <li>Not impersonate another user.</li>
                <li>Not use another person&apos;s account.</li>
                <li>Notify ExoQuest if you believe your account has been compromised.</li>
              </ul>
              <p>You are responsible for activity performed through your account.</p>
              <p>ExoQuest reserves the right to suspend or terminate accounts that violate these Terms.</p>

              <h3>4. Flags and Submissions</h3>
              <p>ExoQuest may use flags, tokens, answers, or other submission mechanisms to verify challenge solutions.</p>
              <p>You agree not to:</p>
              <ul>
                <li>Share flags during an active competition unless explicitly permitted.</li>
                <li>Obtain flags through unauthorized access.</li>
                <li>Manipulate the submission system.</li>
                <li>Submit fraudulent or automated answers intended to disrupt the platform.</li>
                <li>Access unpublished flags or challenge solutions.</li>
                <li>Attempt to modify scores or challenge completion records.</li>
              </ul>
              <p>
                ExoQuest may invalidate submissions or scores obtained through cheating, exploitation of the platform itself, or violation of competition rules.
              </p>

              <h3>5. Competition and Leaderboard Rules</h3>
              <p>ExoQuest may provide competitions, events, tournaments, and public leaderboards.</p>
              <p>Participants must follow any additional rules provided for a particular event.</p>
              <p>ExoQuest reserves the right to remove invalid submissions, correct scoring errors, disqualify participants for cheating, and reset scores when necessary.</p>

              <h3>6. Team Participation</h3>
              <p>Some ExoQuest competitions may allow users to participate as teams. Team members are responsible for following competition regulations.</p>

              <h3>7. Responsible Security Research</h3>
              <p>ExoQuest encourages responsible cybersecurity research and learning. If you discover a vulnerability in ExoQuest&apos;s production infrastructure that is not intentionally part of a challenge, you should report it to contact@exoquest.dev.</p>

              <h3>8. Cookies</h3>
              <p>We employ the use of cookies and similar technologies in accordance with ExoQuest&apos;s Privacy Policy.</p>

              <h3>9. License</h3>
              <p>Unless otherwise stated, ExoQuest and/or its licensors own the intellectual property rights for all material on ExoQuest.</p>

              <h3>10. User-Generated Content</h3>
              <p>Users may submit content such as challenge write-ups or feedback. You remain responsible for the content you submit.</p>

              <h3>11. Third-Party Websites</h3>
              <p>ExoQuest does not control and is not responsible for third-party resources or websites.</p>

              <h3>12. Platform Availability</h3>
              <p>ExoQuest may temporarily suspend or modify services for maintenance, security updates, and operational requirements.</p>

              <h3>13. Disclaimer</h3>
              <p>Challenges are provided for educational and authorized testing purposes. Users are responsible for ensuring that activities remain within authorized scope.</p>

              <h3>14. Limitation of Liability</h3>
              <p>To the maximum extent permitted by applicable law, ExoQuest shall not be responsible for any indirect or consequential loss.</p>

              <h3>15. Termination</h3>
              <p>ExoQuest reserves the right to suspend or terminate access to the platform if a user violates these Terms.</p>

              <h3>16. Changes to These Terms</h3>
              <p>ExoQuest reserves the right to update or modify these Terms and Conditions at any time.</p>

              <h3>17. Contact</h3>
              <p>
                If you have questions regarding these Terms, contact us at{" "}
                <a href="mailto:contact@exoquest.dev" style={{ color: "var(--accent)" }}>
                  contact@exoquest.dev
                </a>.
              </p>
              <p><strong>ExoQuest</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {activeModal === "privacy" && (
        <div
          className="modal-overlay active"
          id="privacy-modal"
          aria-hidden={false}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="privacy-title">
            <button className="modal-close" id="privacy-close" aria-label="Close Privacy" onClick={onClose}>
              ✕
            </button>
            <div className="modal-body">
              <h2 id="privacy-title">Privacy Policy</h2>
              <p>At <strong>ExoQuest</strong>, accessible from our website and platform, one of our main priorities is the privacy of our visitors and users.</p>
              <p>This Privacy Policy document explains what information may be collected by ExoQuest, how we use that information, and how we protect it.</p>

              <h3>1. Information We Collect</h3>
              <p>When you create an account or use our platform, we may collect username, email, team information, challenge submissions, score telemetry, and device log data.</p>

              <h3>2. Information You Provide</h3>
              <p>If you contact us directly, we may receive your name, email, and the content of your message.</p>

              <h3>3. How We Use Your Information</h3>
              <p>We use information to provide and operate the platform, process challenge submissions, maintain leaderboards, detect cheating/abuse, and communicate important service updates.</p>

              <h3>4. Log Files</h3>
              <p>ExoQuest follows standard logging procedures for security monitoring, administration, and performance optimization.</p>

              <h3>5. Cookies</h3>
              <p>Cookies may be used for session management, security, and user preferences.</p>

              <h3>6. Public Information</h3>
              <p>Your username, rank, and competition solves are publicly displayed on competition scoreboards.</p>

              <h3>7. Challenge and Competition Data</h3>
              <p>Submission attempts, timestamps, and solves are recorded for scoring verification and anti-cheat analysis.</p>

              <h3>8. Security</h3>
              <p>We apply industry-standard operational measures to safeguard information against unauthorized access.</p>

              <h3>9. Third-Party Services</h3>
              <p>Third-party infrastructure providers operate in accordance with their respective privacy standards.</p>

              <h3>10. Data Retention</h3>
              <p>Data is retained as long as necessary to provide service, maintain competition records, and fulfill security audits.</p>

              <h3>11. Children&apos;s Privacy</h3>
              <p>ExoQuest does not knowingly collect personal information from children in violation of applicable laws.</p>

              <h3>12. Your Privacy Rights</h3>
              <p>You may request access, correction, or deletion of your personal data by contacting our security team.</p>

              <h3>13. Changes to This Privacy Policy</h3>
              <p>We may update this Privacy Policy periodically. Continued use constitutes acceptance of updated policies.</p>

              <h3>14. Contact Us</h3>
              <p>
                Inquiries regarding privacy should be directed to{" "}
                <a href="mailto:contact@exoquest.dev" style={{ color: "var(--accent)" }}>
                  contact@exoquest.dev
                </a>.
              </p>
              <p><strong>ExoQuest</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* Refund Policy Modal */}
      {activeModal === "refund" && (
        <div
          className="modal-overlay active"
          id="refund-modal"
          aria-hidden={false}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="refund-title">
            <button className="modal-close" id="refund-close" aria-label="Close Refund Policy" onClick={onClose}>
              ✕
            </button>
            <div className="modal-body">
              <h2 id="refund-title">Refund and Cancellation Policy</h2>
              <p>
                Thank you for choosing <strong>ExoQuest</strong>. We strive to ensure our community members are satisfied with our services.
              </p>
              <p>
                Please read this policy carefully. This is the Refund and Cancellation Policy of ExoQuest.
              </p>

              <h3>1. Cancellations</h3>
              <p>
                You can cancel your subscription or services with us at any time. If you decide to cancel, your cancellation will take effect immediately, but you will retain access to the services through the end of your current paid billing period.
              </p>
              <p>
                To cancel your service, please visit your account settings or contact our support team.
              </p>

              <h3>2. Refunds</h3>
              <p>
                We issue refunds for our services within 7 days of the original purchase of the service. After 7 days have passed, we will not be able to offer a refund or exchange.
              </p>
              <p>To be eligible for a return, your request must meet the following criteria:</p>
              <ul>
                <li>The refund request is made within 7 days of the initial purchase.</li>
                <li>You have a valid reason for the refund, such as a major defect in the service or failure to deliver as promised.</li>
                <li>You have not extensively used the service in a way that violates our terms.</li>
              </ul>

              <h3>3. Exceptions</h3>
              <p>
                Certain types of services or digital goods cannot be returned or refunded once they have been accessed or downloaded. We reserve the right to refuse refunds if we suspect abuse of our policy.
              </p>

              <h3>4. Contact Us</h3>
              <p>If you have any questions about our Returns and Refunds Policy, please contact us.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

