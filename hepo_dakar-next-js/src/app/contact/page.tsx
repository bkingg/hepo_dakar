import PageHeader from "@/components/PageHeader";

export default async function Contact() {
  return (
    <>
      <PageHeader>
        <h1 className="page__title text-center">Contact</h1>
      </PageHeader>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15434.825079595117!2d-17.4611552!3d14.7291915!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec10d1e41cbc6b5%3A0xa3eb1f5c16eb8af5!2sHepo%20Dakar!5e0!3m2!1sen!2ssn!4v1723955655123!5m2!1sen!2ssn"
          width="100%"
          height="400"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="section container">
        <h1>Nous Joindre</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
          doloremque similique et commodi, quas id, nulla voluptates autem rerum
          consequatur quod. Porro similique fugiat odio adipisci quos molestiae
          maiores dolorem.
        </p>
        <div>
          <div className="card flex-row flex-wrap align-items-center mb-3 p-4">
            <div className="card-header border-0">
              <i className="bi bi-telephone-fill"></i>
            </div>
            <div className="card-block px-2">
              <h5 className="card-title">Numéro de Tél</h5>
              <p className="card-text">
                <a href="tel:+221338276263">Fixe: +221 33 827 62 63</a>
                <br />
                <a href="tel:+221778744123">Portable: +221 77 874 41 23</a>
              </p>
            </div>
          </div>
          <div className="card flex-row flex-wrap align-items-center mb-3 p-4">
            <div className="card-header border-0">
              <i className="bi bi-pin-map-fill"></i>
            </div>
            <div className="card-block px-2">
              <h5 className="card-title">Adresse</h5>
              <p className="card-text">
                Sicap Liberté 6 extension <br /> N° 8767 ( vers Camp LeClerc )
                <br />
                Dakar, Senegal
              </p>
            </div>
          </div>
          <div className="card flex-row flex-wrap align-items-center mb-3 p-4">
            <div className="card-header border-0">
              <i className="bi bi-envelope-at-fill"></i>
            </div>
            <div className="card-block px-2">
              <h5 className="card-title">Email</h5>
              <p className="card-text">
                <a href="mailto:contact@hepo-dakar.com">
                  contact@hepo-dakar.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
