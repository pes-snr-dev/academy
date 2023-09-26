import Link from "next/link";
export default function Home() {
  return (
    <section className="container">
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Pes Academy</h1>
          <p className="col-md-8 fs-4">
            An Awesome Landing page is coming soon.
          </p>
          <Link href="/courses">
            <button className="btn btn-primary btn-lg" type="button">
              Browse Categories
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
