import {
  Html,
  Head,
  Preview,
  Section,
  Text,
  Container,
} from "@react-email/components";

interface VerificationEmailProps {
  email: string;
  token: string;
}

export default function MainVerificationEmail({ email, token }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Your Verification Code</title>
      </Head>
      <Preview>Your verification code is: {token}</Preview>
      <Section style={styles.background}>
        <Container style={styles.container}>
          <Text style={styles.heading}>Your Verification Code</Text>
          <Text style={styles.text}>
            Hi there,
          </Text>
          <Text style={styles.text}>
            Here is your verification code for Carter:
          </Text>
          <Text style={styles.token}>{token}</Text>
          <Text style={styles.footer}>
            This code will expire in 5 minutes. If you didn't request this, please ignore this email.
          </Text>
        </Container>
      </Section>
    </Html>
  );
}

const styles = {
  background: {
    backgroundColor: "#f5f5f5",
    padding: "20px 0",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#333333",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0 0 20px",
  },
  text: {
    color: "#333333",
    fontSize: "16px",
    margin: "0 0 20px",
    lineHeight: "1.5",
  },
  token: {
    display: "inline-block",
    backgroundColor: "#f0f0f0",
    padding: "15px 30px",
    borderRadius: "4px",
    fontSize: "24px",
    fontWeight: "bold",
    letterSpacing: "2px",
    margin: "20px 0",
    color: "#333333",
  },
  footer: {
    color: "#666666",
    fontSize: "14px",
    marginTop: "20px",
  },
};
