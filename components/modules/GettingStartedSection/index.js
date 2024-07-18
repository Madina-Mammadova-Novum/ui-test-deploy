'use client';

import { getCookieFromBrowser } from '@/utils/helpers';

const GettingStartedSection = () => {
  const email = getCookieFromBrowser('session-user-email');
  const emailText = email || "[user's email address]";

  return (
    <article className="prose pb-5">
      <h1>Registration Successful!</h1>
      <p>Thank you for registering with ShipLink!</p>
      <h2>What&apos;s Next?</h2>
      <ol>
        <li>
          <p>
            <strong>Document Submission:</strong> We have sent an email to <u>{emailText}</u> containing templates for
            the following documents:
          </p>
          <ul>
            <li>Non-Disclosure Agreement (NDA)</li>
            <li>User Authorization Letter</li>
            <li>Acknowledgment Letter</li>
          </ul>
          <p>Please fill out these documents on your company letterhead and submit them as instructed in the email.</p>
        </li>
        <li>
          <p>
            <strong>Document Review:</strong> Once we receive your documents, our team will review them. This process
            may take a few business days. We will notify you via email once your documents have been reviewed.
          </p>
        </li>
        <li>
          <p>
            <strong>Identity Verification:</strong> If your documents are accepted, you will receive an email with
            instructions to verify your identity. You will need:
          </p>
          <ul>
            <li>An internationally recognized identity document (e.g., passport, driver&apos;s license)</li>
            <li>A face check to match with the picture on your ID</li>
          </ul>
        </li>
        <li>
          <p>
            <strong>Account Activation:</strong> Once your identity verification is successful, your account will be
            fully activated. You can then start exploring all the features and services we offer.
          </p>
        </li>
        <li>
          <p>
            <strong>Support:</strong> If you have any questions or need assistance, feel free to reach out to our
            support team at [support email/phone number].
          </p>
        </li>
      </ol>

      <p>We&apos;re excited to have you on board and look forward to helping you achieve your goals with ShipLink.</p>

      <h2>Stay Connected</h2>

      <p>Follow us on social media to stay updated with the latest news, tips, and special offers:</p>

      <ul>
        <li>
          <a href="https://www.facebook.com/shiplink">Facebook</a>
        </li>
        <li>
          <a href="https://www.twitter.com/shiplink">Twitter</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/company/shiplink">LinkedIn</a>
        </li>
        <li>
          <a href="https://www.instagram.com/shiplink">Instagram</a>
        </li>
      </ul>

      <p>
        <strong>Thank you for joining us!</strong>
      </p>
    </article>
  );
};

export default GettingStartedSection;
