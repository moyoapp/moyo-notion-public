import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { Normalize } from 'styled-normalize';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const page = ctx.renderPage(
      (App) => (props) =>
        sheet.collectStyles(
          <>
            <Normalize />
            <App {...props} />
          </>,
        ),
    );
    const styles = sheet.getStyleElement();
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, ...page, styles };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="모여. 모임과 공간을 연결하다." />
          <link rel="icon" href="/favicon.ico" />
          {/* this.props.styles */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
