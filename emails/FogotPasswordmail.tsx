import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Section,
  Text,
  Button,
  Img,
  Container,
} from "@react-email/components";

interface VerificationEmailProps {
  email: string;
  token: string;
}

export default function VerificationEmail({ email, token }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Password Reset</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Verify your account with this code: {token}</Preview>
      <Section style={styles.background}>
        <Container style={styles.container}>
          {/* Product Logo/Image */}
          {/* <Img
            src="https://firebasestorage.googleapis.com/v0/b/my-new-app-888e3.appspot.com/o/emaillogo.png?alt=media&token=8c204065-01dd-46c4-89c1-5f1e34bdbd1d"
            alt="Product Logo"
            width=""
            height="110"
            style={styles.image}
          /> */}
          <Text style={styles.head}>Carter</Text>
          <Text style={styles.email}>{email}</Text>
          <Heading style={styles.heading}>Change Your Password</Heading>

          {/* Body Text */}
          <Text style={styles.text}>
            Hi there, <br />
            Please use the verification code below to reset password.
          </Text>

          {/* Token/Code */}
          <Text style={styles.token}>{token}</Text>

          {/* Footer */}
          <Text style={styles.footer}>
            If you didn&apos;t request this email, you can safely ignore it.
          </Text>
        </Container>
      </Section>
    </Html>
  );
}

// Styles
const styles = {
  head:{
    color: "#ffffff",
    fontSize: "24px",
  },
  email:{
    color: "#FFCCCB",
    fontSize: "16px",
    margin: "0 0 20px",
  },
  background: {
    backgroundColor: "#f5f5f5",
    padding: "20px 0",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#030014",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center" as const,
  },
  image: {
    margin: "0 auto 20px",
    display: "block",
  },
  heading: {
    color: "#333333",
    fontSize: "20px",
    fontWeight: "bold",
    margin: "0 0 20px",
  },
  text: {
    color: "#ffffff",
    fontSize: "16px",
    margin: "0 0 20px",
    lineHeight: "1.5",
  },
  token: {
    display: "inline-block",
    backgroundColor: "#f0f0f0",
    padding: "10px 20px",
    borderRadius: "4px",
    fontWeight: "bold",
    letterSpacing: "1px",
    margin: "0 0 20px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "4px",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block",
    margin: "0 auto 20px",
  },
  footer: {
    color: "#888888",
    fontSize: "12px",
    marginTop: "20px",
  },
};
