import Head from 'next/head'
import Link from 'next/link';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function Home() {
  return (
    <>
      <Head>
        <title>NextJS Playground</title>
      </Head>

      <main className="main">
        <Typography variant="h1" gutterBottom>
          <strong>
            NextJS Playground
          </strong>
        </Typography>

        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {/*<Link href="/login">*/}
          {/*  <a className={styles.card}>*/}
          {/*    <h2>Auth &rarr;</h2>*/}
          {/*    <p>Auth0 boilerplate</p>*/}
          {/*  </a>*/}
          {/*</Link>*/}
          <Grid item xs={4} md={3} className="card">
            <Link href="/reviews">
              <a>
                <Typography variant="h4" gutterBottom>
                  <strong>Reviews &rarr;</strong>
                </Typography>
                <Typography>Performance reviews</Typography>
              </a>
            </Link>
          </Grid>
        </Grid>
      </main>
    </>
  )
}
