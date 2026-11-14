import { PageRoute, ContactFormData, BookDetail, CompanyInfo } from './types';

class KDKWebsiteApp {
  private currentRoute: PageRoute = 'beranda';
  private appContainer: HTMLElement;

  private company: CompanyInfo = {
    legalName: 'PT Kunci Daya Kreasi',
    legalEntityForm: 'Perseroan Perorangan',
    businessSector: 'Penerbitan Buku',
    kbliCode: '58110',
    officialDomain: 'penerbitkunci.id',
    officialEmail: 'admin@penerbitkunci.id',
    officialAddress: 'Tangerang Selatan, Banten',
    positioning: 'Penerbit Buku Independen Indonesia dengan Visi Internasional',
    slogan: 'Menerbitkan Kualitas, Menjangkau Dunia'
  };

  private book: BookDetail = {
    id: 'spirit-and-truth-third-reformation',
    title: 'Spirit and Truth: Third Reformation',
    subtitle: 'When AI Encountered the Living God...',
    author: 'J. Andrew',
    language: 'Inggris',
    permanentUrl: '/buku/spirit-and-truth-third-reformation/',
    editions: [
      {
        format: 'Paperback',
        publisher: 'PT Kunci Daya Kreasi',
        isbnStatus: 'Akan diajukan',
        releaseStatus: 'Dalam Persiapan'
      },
      {
        format: 'Hardcover',
        publisher: 'PT Kunci Daya Kreasi',
        isbnStatus: 'Akan diajukan',
        releaseStatus: 'Dalam Persiapan'
      }
    ],
    synopsis: 'Di tengah era kemajuan kecerdasan buatan (Artificial Intelligence) yang pesat, muncul pertanyaan-pertanyaan mendasar mengenai kesadaran, penciptaan, dan kebenaran rohani. Buku ini menyajikan penjelajahan filosofis dan teologis yang menggugah, mempertemukan rasionalitas teknologi modern dengan pengalaman perjumpaan transenden bersama Sang Pencipta.',
    digitalHistory: {
      description: 'Buku ini sebelumnya telah diterbitkan secara mandiri oleh penulis dalam format digital melalui platform global (Amazon Kindle & Google Play Books). Edisi digital tersebut merupakan publikasi mandiri penulis dan bukan edisi yang diterbitkan oleh PT Kunci Daya Kreasi.',
      amazonUrl: 'https://www.amazon.com/dp/B0HLLJ39JK',
      googlePlayUrl: 'https://play.google.com/store/books/details?id=tOcfEgAAQBAJ&pli=1'
    }
  };

  constructor() {
    const el = document.getElementById('app');
    if (!el) throw new Error('Root #app container not found in DOM.');
    this.appContainer = el;
    this.init();
  }

  private init(): void {
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public navigateTo(route: PageRoute): void {
    this.currentRoute = route;
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private showToast(message: string): void {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>ℹ️</span> <div>${message}</div>`;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  private renderHeader(): string {
    return `
      <header>
        <div class="container header-container">
          <div class="logo-link brand-lockup" id="nav-logo" role="link" tabindex="0" aria-label="PT Kunci Daya Kreasi - Beranda">
            <span class="brand-mark">
              <img src="/assets/logo-kdk-white-cropped.png" alt="">
            </span>
            <span class="brand-wordmark">
              <strong>PT KUNCI DAYA KREASI</strong>
            </span>
          </div>
          <div class="nav-right">
            <nav id="primary-navigation" aria-label="Navigasi utama">
              <ul>
                <li><a class="${this.currentRoute === 'beranda' ? 'active' : ''}" id="nav-beranda">Beranda</a></li>
                <li><a class="${this.currentRoute === 'tentang' ? 'active' : ''}" id="nav-tentang">Tentang Kami</a></li>
                <li><a class="${this.currentRoute === 'katalog' || this.currentRoute === 'detail' ? 'active' : ''}" id="nav-katalog">Katalog Buku</a></li>
                <li><a class="${this.currentRoute === 'kontak' ? 'active' : ''}" id="nav-kontak">Kontak</a></li>
              </ul>
            </nav>
            <button class="search-btn" id="btn-search" title="Cari Katalog">🔍</button>
            <button class="lang-switch" id="btn-lang">ID / EN</button>
          </div>
          <button class="mobile-menu-btn" id="btn-mobile" type="button"
            aria-label="Buka navigasi" aria-controls="primary-navigation" aria-expanded="false">
            <span aria-hidden="true">☰</span>
          </button>
        </div>
      </header>
    `;
  }

  private renderFooter(): string {
    return `
      <footer>
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col">
              <div class="footer-brand brand-lockup" aria-label="PT Kunci Daya Kreasi">
                <span class="brand-mark">
                  <img src="/assets/logo-kdk-white-cropped.png" alt="">
                </span>
                <span class="brand-wordmark">
                  <strong>PT KUNCI DAYA KREASI</strong>
                </span>
              </div>
              <h4>${this.company.legalName}</h4>
              <p>${this.company.slogan}.<br>${this.company.positioning}.</p>
            </div>
            <div class="footer-col">
              <h4>Navigasi</h4>
              <div class="footer-links">
                <a id="foot-beranda">Beranda</a>
                <a id="foot-tentang">Tentang Kami</a>
                <a id="foot-katalog">Katalog Buku</a>
                <a id="foot-kontak">Kontak</a>
              </div>
            </div>
            <div class="footer-col">
              <h4>Kontak Resmi</h4>
              <p>Alamat: ${this.company.officialAddress}<br>Email: <a href="mailto:${this.company.officialEmail}">${this.company.officialEmail}</a><br>Website: <a href="https://${this.company.officialDomain}" target="_blank" rel="noopener noreferrer">https://${this.company.officialDomain}</a></p>
            </div>
          </div>
          <div class="footer-bottom">
            &copy; 2026 ${this.company.legalName}. Hak cipta dilindungi undang-undang.
          </div>
        </div>
      </footer>
    `;
  }

  private renderBeranda(): string {
    return `
      <!-- Hero Section -->
      <section class="hero hero-home">
        <div class="container">
          <div class="hero-content">
            <h1>Menerbitkan Kualitas, Menjangkau Dunia</h1>
            <div class="subtitle">Penerbit Buku Independen Indonesia dengan Visi Internasional</div>
            <p>PT Kunci Daya Kreasi hadir sebagai perusahaan penerbitan buku independen yang berkomitmen terhadap kualitas karya, integritas intelektual, dan profesionalisme penerbitan.</p>
            <p>Dengan visi yang berorientasi internasional, kami berupaya menghadirkan karya-karya bermutu yang memiliki nilai dan relevansi bagi pembaca lintas negara dan budaya.</p>
            <button class="btn" id="btn-hero-katalog">Jelajahi Katalog Buku →</button>
          </div>
        </div>
      </section>

      <!-- Section 2: Prinsip Penerbitan -->
      <section>
        <div class="container">
          <div class="section-header">
            <h2>Prinsip yang Mendasari Penerbitan Kami</h2>
            <div class="gold-divider"></div>
            <p>Fondasi profesionalisme dan integritas dalam setiap karya yang kami terbitkan.</p>
          </div>
          <div class="principles-grid">
            <div class="principle-card">
              <div class="principle-icon">📖</div>
              <h3>Komitmen terhadap Kualitas</h3>
              <p>Mengutamakan substansi, orisinalitas, dan mutu penyajian dalam setiap karya yang diterbitkan.</p>
            </div>
            <div class="principle-card">
              <div class="principle-icon">⚖️</div>
              <h3>Independensi Editorial</h3>
              <p>Menjunjung tinggi kebebasan dan tanggung jawab editorial dalam menentukan karya yang diterbitkan.</p>
            </div>
            <div class="principle-card">
              <div class="principle-icon">🌐</div>
              <h3>Perspektif Global</h3>
              <p>Mengembangkan penerbitan dengan wawasan internasional dan memperhatikan relevansi karya bagi pembaca lintas negara dan budaya.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Publikasi Perdana -->
      <section style="background-color: #f1ede4; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
        <div class="container">
          <div class="section-header">
            <h2>Publikasi Perdana</h2>
            <div class="gold-divider"></div>
            <p>PT Kunci Daya Kreasi sedang mempersiapkan penerbitan perdananya dalam format paperback dan hardcover.</p>
          </div>

          <div class="featured-book-wrapper">
            <div class="book-cover-container">
              <img class="book-cover-image" src="/assets/spirit-and-truth-cover.jpg" alt="Sampul buku ${this.book.title} karya ${this.book.author}">
            </div>
            <div class="book-details-content">
              <span class="badge">Dalam Persiapan</span>
              <h3>${this.book.title}</h3>
              <div class="book-subtitle">${this.book.subtitle}</div>
              <p class="book-desc">Publikasi tersebut merupakan edisi cetak dari sebuah karya berbahasa Inggris yang sebelumnya telah diterbitkan secara mandiri oleh penulisnya dalam format digital. Penerbitan ini menjadi langkah awal perusahaan dalam mengembangkan publikasi berkualitas dengan orientasi pembaca internasional.</p>
              
              <div class="meta-list">
                <div class="meta-item"><strong>Penulis:</strong> ${this.book.author}</div>
                <div class="meta-item"><strong>Bahasa:</strong> ${this.book.language}</div>
                <div class="meta-item"><strong>Format:</strong> Paperback & Hardcover</div>
                <div class="meta-item"><strong>Penerbit:</strong> ${this.company.legalName}</div>
              </div>

              <div>
                <button class="btn" id="btn-view-detail-home">Lihat Detail Buku →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: Penutup Beranda -->
      <section style="text-align: center;">
        <div class="container" style="max-width: 700px;">
          <h2>Jelajahi Publikasi Kami</h2>
          <button class="btn" id="btn-bottom-katalog" style="margin-top: 55px;">Lihat Katalog Buku</button>
        </div>
      </section>
    `;
  }

  private renderTentang(): string {
    return `
      <section class="hero" style="padding: 70px 0;">
        <div class="container">
          <div class="hero-content">
            <h1>Tentang Kami</h1>
            <div class="subtitle">Profil Perusahaan dan Identitas Badan Usaha</div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="about-grid">
            <div class="about-text">
              <span class="badge">Profil Perusahaan</span>
              <h2>Penerbitan dengan Visi dan Integritas</h2>
              <p>PT Kunci Daya Kreasi merupakan perusahaan penerbitan buku independen yang berbadan hukum di Indonesia.</p>
              <p>Perusahaan didirikan dengan komitmen untuk mengembangkan dan menerbitkan karya-karya berkualitas yang memiliki nilai intelektual, orisinalitas, serta relevansi bagi pembaca.</p>
              <p>Kami memandang penerbitan bukan sekadar kegiatan produksi dan distribusi buku, melainkan juga tanggung jawab dalam menghadirkan karya yang bernilai dan dapat memberikan kontribusi bermakna bagi pembacanya.</p>
              <p>Dengan mengedepankan independensi editorial dan profesionalisme, PT Kunci Daya Kreasi berupaya membangun kegiatan penerbitan yang berkualitas, berkelanjutan, dan memiliki perspektif internasional.</p>
            </div>
            <div class="info-box">
              <h3 style="margin-bottom: 10px;">Data Legalitas dan Operasional Perusahaan</h3>
              <table class="info-table">
                <tr><th>Nama Badan Hukum</th><td>${this.company.legalName}</td></tr>
                <tr><th>Bentuk Badan Hukum</th><td>${this.company.legalEntityForm}</td></tr>
                <tr><th>Bidang Usaha</th><td>${this.company.businessSector}</td></tr>
                <tr><th>KBLI</th><td>${this.company.kbliCode}</td></tr>
                <tr><th>Domain Resmi</th><td>${this.company.officialDomain}</td></tr>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section style="background-color: #f1ede4; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
        <div class="container">
          <div class="section-header">
            <h2>Visi & Misi Kami</h2>
            <div class="gold-divider"></div>
            <p>Arah dan komitmen jangka panjang dalam dunia penerbitan.</p>
          </div>

          <div class="vision-card" style="background: var(--white); padding: 40px; border-radius: 12px; margin: 0 auto 32px; box-shadow: 0 10px 30px rgba(16,44,76,0.05); border-left: 6px solid var(--gold);">
            <h3 style="font-size: 24px; margin-bottom: 14px; color: var(--navy);">Visi Kami</h3>
            <p style="font-size: 17px; line-height: 1.8;">Menjadi perusahaan penerbitan independen yang dikenal atas kualitas karya, integritas editorial, dan kontribusinya dalam menghadirkan publikasi bernilai bagi pembaca di tingkat nasional maupun internasional.</p>
          </div>

          <h3 style="font-size: 26px; margin-bottom: 24px; text-align: center;">Misi Kami</h3>
          <div class="mission-list" style="max-width: 900px; margin: 0 auto;">
            <div class="mission-item">
              <div class="mission-num">01</div>
              <div>
                <h4 style="margin-bottom: 6px; font-size: 18px;">Kualitas Substansi</h4>
                <p style="font-size: 15px; color: var(--charcoal);">Menerbitkan karya-karya berkualitas yang memiliki kedalaman substansi, orisinalitas, dan nilai intelektual.</p>
              </div>
            </div>
            <div class="mission-item">
              <div class="mission-num">02</div>
              <div>
                <h4 style="margin-bottom: 6px; font-size: 18px;">Integritas & Independensi</h4>
                <p style="font-size: 15px; color: var(--charcoal);">Menjunjung tinggi independensi editorial dalam menentukan karya berdasarkan standar dan prinsip penerbitan perusahaan.</p>
              </div>
            </div>
            <div class="mission-item">
              <div class="mission-num">03</div>
              <div>
                <h4 style="margin-bottom: 6px; font-size: 18px;">Relevansi Lintas Budaya</h4>
                <p style="font-size: 15px; color: var(--charcoal);">Mengembangkan publikasi yang relevan bagi pembaca dari berbagai latar belakang dan budaya.</p>
              </div>
            </div>
            <div class="mission-item">
              <div class="mission-num">04</div>
              <div>
                <h4 style="margin-bottom: 6px; font-size: 18px;">Teknologi & Distribusi</h4>
                <p style="font-size: 15px; color: var(--charcoal);">Memanfaatkan perkembangan teknologi penerbitan serta peluang distribusi nasional dan internasional untuk memperluas akses terhadap karya terbitan.</p>
              </div>
            </div>
            <div class="mission-item">
              <div class="mission-num">05</div>
              <div>
                <h4 style="margin-bottom: 6px; font-size: 18px;">Profesionalisme Jangka Panjang</h4>
                <p style="font-size: 15px; color: var(--charcoal);">Mengembangkan kegiatan penerbitan secara profesional, berintegritas, dan berorientasi pada kualitas jangka panjang.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container" style="max-width: 900px;">
          <div class="section-header">
            <h2>Filosofi dan Kebijakan Editorial</h2>
            <div class="gold-divider"></div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 40px;">
            <div style="background: var(--white); padding: 40px; border-radius: 10px; box-shadow: 0 8px 25px rgba(16,44,76,0.04);">
              <h3 style="font-size: 22px; margin-bottom: 14px; color: var(--navy);">Filosofi Penerbitan</h3>
              <p style="font-size: 16px; line-height: 1.8; margin-bottom: 14px;">Kami percaya bahwa kualitas sebuah buku terutama ditentukan oleh substansi dan nilai yang disampaikannya.</p>
              <p style="font-size: 16px; line-height: 1.8;">Oleh karena itu, PT Kunci Daya Kreasi menempatkan kualitas, orisinalitas, dan integritas intelektual sebagai pertimbangan utama dalam memilih serta mengembangkan karya yang diterbitkan.</p>
            </div>

            <div style="background: var(--white); padding: 40px; border-radius: 10px; box-shadow: 0 8px 25px rgba(16,44,76,0.04);">
              <h3 style="font-size: 22px; margin-bottom: 14px; color: var(--navy);">Independensi Editorial</h3>
              <p style="font-size: 16px; line-height: 1.8; margin-bottom: 16px;">Sebagai penerbit independen, PT Kunci Daya Kreasi memiliki kebijakan editorial dalam menentukan karya yang akan diterbitkan. Keputusan penerbitan dilakukan berdasarkan penilaian terhadap kualitas substansi, orisinalitas, integritas intelektual, serta kesesuaian karya dengan visi dan standar perusahaan.</p>
              <p style="font-size: 16px; line-height: 1.8;">Perusahaan tidak berkewajiban menerbitkan setiap naskah yang diajukan, dan setiap keputusan penerbitan dilaksanakan dengan menghormati hak cipta penulis, perjanjian yang berlaku, serta ketentuan hukum.</p>
            </div>

            <div style="background: var(--white); padding: 40px; border-radius: 10px; box-shadow: 0 8px 25px rgba(16,44,76,0.04);">
              <h3 style="font-size: 22px; margin-bottom: 14px; color: var(--navy);">Perspektif Global</h3>
              <p style="font-size: 16px; line-height: 1.8; margin-bottom: 14px;">PT Kunci Daya Kreasi memiliki visi untuk mengembangkan publikasi yang dapat menjangkau pembaca lintas negara dan budaya. Orientasi internasional tersebut tidak membatasi penerbitan pada kewarganegaraan penulis, bahasa tertentu, maupun satu kelompok genre buku.</p>
              <p style="font-size: 16px; line-height: 1.8;">Perusahaan mengutamakan kualitas dan kesesuaian karya dengan kebijakan editorialnya, sambil memperhatikan peluang publikasi dan distribusi yang lebih luas.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private renderKatalog(): string {
    return `
      <section class="hero" style="padding: 70px 0;">
        <div class="container">
          <div class="hero-content">
            <h1>Katalog Buku</h1>
            <div class="subtitle">Daftar Publikasi / Karya Penerbitan</div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-header" style="text-align: left; margin-bottom: 40px;">
            <p style="font-size: 18px; color: var(--charcoal); line-height: 1.8;">Sebagai perusahaan penerbitan yang baru dibentuk, saat ini kami sedang mempersiapkan sebuah karya buku untuk diterbitkan, dengan memperhatikan kualitas substansi, integritas editorial, dan standar penerbitan profesional.</p>
            <div class="gold-divider" style="margin: 20px 0 0 0;"></div>
          </div>

          <h3 style="font-size: 24px; margin-bottom: 24px; color: var(--navy);">Karya yang Sedang Dipersiapkan</h3>

          <div class="featured-book-wrapper">
            <div class="book-cover-container">
              <img class="book-cover-image" src="/assets/spirit-and-truth-cover.jpg" alt="Sampul buku ${this.book.title} karya ${this.book.author}">
            </div>
            <div class="book-details-content">
              <span class="badge">Dalam Persiapan</span>
              <h3>${this.book.title}</h3>
              <div class="book-subtitle">${this.book.subtitle}</div>
              <p class="book-desc">Edisi cetak perdana dalam format paperback dan hardcover. Karya ini menghadirkan permenungan mendalam mengenai persimpangan antara kecerdasan buatan (AI), kebenaran rohani, dan transformasi iman di era kontemporer.</p>
              
              <div class="meta-list">
                <div class="meta-item"><strong>Penulis:</strong> ${this.book.author}</div>
                <div class="meta-item"><strong>Bahasa:</strong> ${this.book.language}</div>
                <div class="meta-item"><strong>Penerbit Edisi Cetak:</strong> ${this.company.legalName}</div>
                <div class="meta-item"><strong>ISBN:</strong> Akan diajukan</div>
              </div>

              <div>
                <button class="btn" id="btn-view-detail-catalog">Lihat Detail Buku →</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private renderDetail(): string {
    return `
      <section class="hero" style="padding: 50px 0;">
        <div class="container">
          <div style="font-size: 14px; color: var(--gold); margin-bottom: 10px;">
            <a id="btn-back-katalog" style="color: var(--gold); cursor: pointer;">← Kembali ke Katalog Buku</a> / Detail Publikasi
          </div>
          <h1>${this.book.title}</h1>
          <div class="subtitle">${this.book.subtitle}</div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="detail-layout" style="display: grid; grid-template-columns: 380px 1fr; gap: 50px; align-items: start;">
            
            <div>
              <div style="background: linear-gradient(135deg, #be6703, #A94F24); padding: 40px; border-radius: 12px; display: flex; justify-content: center; box-shadow: 0 12px 30px rgba(16,44,76,0.1); margin-bottom: 24px;">
                <img class="book-cover-image book-cover-image-detail" src="/assets/spirit-and-truth-cover.jpg" alt="Sampul buku ${this.book.title} karya ${this.book.author}">
              </div>

              <div style="background: var(--white); padding: 24px; border-radius: 10px; border: 1px solid var(--border-color); box-shadow: 0 4px 15px rgba(16,44,76,0.04);">
                <h4 style="font-size: 18px; margin-bottom: 14px; color: var(--navy);">Riwayat Publikasi Digital</h4>
                <p style="font-size: 14px; color: var(--charcoal); margin-bottom: 16px; line-height: 1.6;">${this.book.digitalHistory.description}</p>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                  <a href="${this.book.digitalHistory.amazonUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="justify-content: center; font-size: 13px; padding: 10px;">Amazon Kindle Edition ↗</a>
                  <a href="${this.book.digitalHistory.googlePlayUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="justify-content: center; font-size: 13px; padding: 10px;">Google Play Books Edition ↗</a>
                </div>
              </div>
            </div>

            <div>
              <span class="badge">Dalam Persiapan</span>
              <h2 style="font-size: 34px; margin-bottom: 10px;">${this.book.title}</h2>
              <div style="font-size: 18px; color: var(--slate); font-family: 'Playfair Display', serif; margin-bottom: 24px;">${this.book.subtitle}</div>
              
              <div style="background: var(--white); padding: 30px; border-radius: 10px; border: 1px solid var(--border-color); box-shadow: 0 8px 25px rgba(16,44,76,0.04); margin-bottom: 30px;">
                <h3 style="font-size: 20px; margin-bottom: 16px; color: var(--navy); border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">Sinopsis Buku</h3>
                <p style="font-size: 16px; line-height: 1.8; color: var(--charcoal); margin-bottom: 16px;">${this.book.synopsis}</p>
              </div>

              <h3 style="font-size: 22px; margin-bottom: 20px; color: var(--navy);">Format Edisi Cetak</h3>
              
              <div class="book-editions-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                ${this.book.editions.map(ed => `
                  <div style="background: var(--white); padding: 25px; border-radius: 10px; border-top: 4px solid ${ed.format === 'Paperback' ? 'var(--gold)' : 'var(--navy)'}; border: 1px solid var(--border-color); box-shadow: 0 6px 20px rgba(16,44,76,0.04);">
                    <h4 style="font-size: 18px; color: var(--navy); margin-bottom: 14px;">${ed.format} Edition</h4>
                    <ul style="display: flex; flex-direction: column; gap: 10px; font-size: 14px;">
                      <li><strong>Penerbit:</strong> ${ed.publisher}</li>
                      <li><strong>ISBN:</strong> ${ed.isbnStatus}</li>
                      <li><strong>Status:</strong> ${ed.releaseStatus}</li>
                      <li><strong>Format:</strong> ${ed.format}</li>
                      <li><strong>Harga:</strong> Menunggu Penetapan</li>
                    </ul>
                  </div>
                `).join('')}
              </div>

              <div style="background: rgba(198, 154, 75, 0.1); padding: 20px 24px; border-radius: 8px; border-left: 4px solid var(--gold);">
                <h5 style="font-size: 15px; color: var(--navy); margin-bottom: 6px;">Catatan Pengajuan ISBN</h5>
                <p style="font-size: 14px; color: var(--charcoal);">Halaman ini memiliki URL permanen (<code>${this.book.permanentUrl}</code>) yang digunakan dalam proses pengajuan ISBN kepada Perpustakaan Nasional Republik Indonesia sesuai Peraturan Perpusnas No. 11 Tahun 2025.</p>
              </div>

            </div>

          </div>
        </div>
      </section>
    `;
  }

  private renderKontak(): string {
    return `
      <section class="hero" style="padding: 70px 0;">
        <div class="container">
          <div class="hero-content">
            <h1>Informasi &amp; Korespondensi</h1>
            <div class="subtitle">Saluran Komunikasi dan Informasi Perusahaan</div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="contact-grid">
            
            <div class="contact-info-card">
              <h3>Hubungi Kami</h3>
              <p>Untuk pertanyaan mengenai perusahaan, informasi publikasi, maupun korespondensi bisnis, silakan menghubungi PT Kunci Daya Kreasi melalui saluran komunikasi berikut.</p>
              
              <div class="contact-detail-list">
                <div class="contact-detail-item">
                  <div class="contact-icon">📍</div>
                  <div>
                    <strong style="display: block; color: var(--gold); margin-bottom: 4px;">Alamat </strong>
                    <span style="color: rgba(255,255,255,0.9); font-size: 15px;">${this.company.officialAddress}</span>
                  </div>
                </div>

                <div class="contact-detail-item">
                  <div class="contact-icon">✉️</div>
                  <div>
                    <strong style="display: block; color: var(--gold); margin-bottom: 4px;">Email </strong>
                    <a href="mailto:${this.company.officialEmail}" style="color: rgba(255,255,255,0.9); font-size: 15px;">${this.company.officialEmail}</a>
                  </div>
                </div>

                <div class="contact-detail-item">
                  <div class="contact-icon">🌐</div>
                  <div>
                    <strong style="display: block; color: var(--gold); margin-bottom: 4px;">Website </strong>
                    <a href="https://${this.company.officialDomain}" target="_blank" rel="noopener noreferrer" style="color: rgba(255,255,255,0.9); font-size: 15px;">https://${this.company.officialDomain}</a>
                  </div>
                </div>
              </div>
            </div>

            <div class="contact-form-card">
              <h3 style="font-size: 24px; margin-bottom: 10px; color: var(--navy);">Kirim Pesan</h3>
              <p style="font-size: 15px; color: var(--slate); margin-bottom: 24px;">Silakan isi formulir di bawah ini untuk mengirimkan pesan atau pertanyaan kepada tim kami.</p>

              <form id="contact-form">
                <div class="form-group">
                  <label for="form-name">Nama Lengkap</label>
                  <input type="text" id="form-name" name="name" class="form-control" required maxlength="120" autocomplete="name" placeholder="Masukkan nama Anda">
                </div>

                <div class="form-group">
                  <label for="form-email">Alamat Email</label>
                  <input type="email" id="form-email" name="email" class="form-control" required maxlength="254" autocomplete="email" placeholder="nama@email.com">
                </div>

                <div class="form-group">
                  <label for="form-subject">Subjek</label>
                  <input type="text" id="form-subject" name="subject" class="form-control" required maxlength="180" placeholder="Subjek pesan">
                </div>

                <div class="form-group">
                  <label for="form-message">Pesan</label>
                  <textarea id="form-message" name="message" class="form-control" required maxlength="5000" placeholder="Tuliskan pesan Anda di sini..."></textarea>
                </div>

                <div class="form-group" aria-hidden="true" style="position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;">
                  <label for="form-website">Jangan isi kolom ini</label>
                  <input type="text" id="form-website" name="website" tabindex="-1" autocomplete="off">
                </div>
                <p id="contact-status" role="status" aria-live="polite" style="font-size: 14px; margin-bottom: 14px;"></p>
                <button type="submit" id="contact-submit" class="btn" style="width: 100%; justify-content: center;">Kirim Pesan →</button>
              </form>
            </div>

          </div>
        </div>
      </section>
    `;
  }

  private render(): void {
    let mainContent = '';
    switch (this.currentRoute) {
      case 'beranda':
        mainContent = this.renderBeranda();
        break;
      case 'tentang':
        mainContent = this.renderTentang();
        break;
      case 'katalog':
        mainContent = this.renderKatalog();
        break;
      case 'detail':
        mainContent = this.renderDetail();
        break;
      case 'kontak':
        mainContent = this.renderKontak();
        break;
    }

    this.appContainer.innerHTML = `
      ${this.renderHeader()}
      <main>${mainContent}</main>
      ${this.renderFooter()}
    `;

    this.bindEvents();
  }

  private bindEvents(): void {
    // Accessible mobile navigation toggle.
    const mobileMenuButton = document.getElementById('btn-mobile') as HTMLButtonElement | null;
    const primaryNavigation = document.getElementById('primary-navigation');

    mobileMenuButton?.addEventListener('click', () => {
      const isOpen = primaryNavigation?.classList.toggle('is-open') ?? false;
      mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
      mobileMenuButton.setAttribute('aria-label', isOpen ? 'Tutup navigasi' : 'Buka navigasi');
      mobileMenuButton.innerHTML = isOpen
        ? '<span aria-hidden="true">×</span>'
        : '<span aria-hidden="true">☰</span>';
    });

    // Close the dropdown when another part of the header is selected.
    document.querySelector('header')?.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('#btn-mobile') || target.closest('#primary-navigation')) return;
      primaryNavigation?.classList.remove('is-open');
      mobileMenuButton?.setAttribute('aria-expanded', 'false');
      mobileMenuButton?.setAttribute('aria-label', 'Buka navigasi');
      if (mobileMenuButton) mobileMenuButton.innerHTML = '<span aria-hidden="true">☰</span>';
    });

    // Allow keyboard users to activate the brand link.
    document.getElementById('nav-logo')?.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.navigateTo('beranda');
      }
    });

    // Navigation listeners
    document.getElementById('nav-logo')?.addEventListener('click', () => this.navigateTo('beranda'));
    document.getElementById('nav-beranda')?.addEventListener('click', () => this.navigateTo('beranda'));
    document.getElementById('nav-tentang')?.addEventListener('click', () => this.navigateTo('tentang'));
    document.getElementById('nav-katalog')?.addEventListener('click', () => this.navigateTo('katalog'));
    document.getElementById('nav-kontak')?.addEventListener('click', () => this.navigateTo('kontak'));

    document.getElementById('foot-beranda')?.addEventListener('click', () => this.navigateTo('beranda'));
    document.getElementById('foot-tentang')?.addEventListener('click', () => this.navigateTo('tentang'));
    document.getElementById('foot-katalog')?.addEventListener('click', () => this.navigateTo('katalog'));
    document.getElementById('foot-kontak')?.addEventListener('click', () => this.navigateTo('kontak'));

    // Dynamic Route Listeners
    document.getElementById('btn-hero-katalog')?.addEventListener('click', () => this.navigateTo('katalog'));
    document.getElementById('btn-bottom-katalog')?.addEventListener('click', () => this.navigateTo('katalog'));
    document.getElementById('btn-view-detail-home')?.addEventListener('click', () => this.navigateTo('detail'));
    document.getElementById('btn-view-detail-catalog')?.addEventListener('click', () => this.navigateTo('detail'));
    document.getElementById('btn-back-katalog')?.addEventListener('click', () => this.navigateTo('katalog'));

    // Header buttons
    document.getElementById('btn-search')?.addEventListener('click', () => {
      this.showToast('Fitur pencarian katalog buku siap digunakan saat data publikasi bertambah.');
    });

    document.getElementById('btn-lang')?.addEventListener('click', () => {
      this.showToast('Bilingual mode (ID / EN) dipersiapkan untuk Tahap 2 peluncuran website.');
    });

    // Send contact form to the serverless email endpoint (Resend).
    const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
    if (contactForm) {
      contactForm.addEventListener('submit', async (e: Event) => {
        e.preventDefault();
        if (!contactForm.reportValidity()) return;

        const nameInput = document.getElementById('form-name') as HTMLInputElement;
        const emailInput = document.getElementById('form-email') as HTMLInputElement;
        const subjectInput = document.getElementById('form-subject') as HTMLInputElement;
        const messageInput = document.getElementById('form-message') as HTMLTextAreaElement;
        const websiteInput = document.getElementById('form-website') as HTMLInputElement;
        const submitButton = document.getElementById('contact-submit') as HTMLButtonElement;
        const status = document.getElementById('contact-status');

        const formData: ContactFormData & { website: string } = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          subject: subjectInput.value.trim(),
          message: messageInput.value.trim(),
          website: websiteInput.value
        };

        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
          this.showToast('Mohon lengkapi semua kolom sebelum mengirim pesan.');
          return;
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Mengirim...';
        if (status) {
          status.textContent = 'Pesan sedang dikirim. Mohon tunggu.';
          status.style.color = 'var(--slate)';
        }

        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          const result = await response.json() as { success?: boolean; message?: string };

          if (!response.ok || !result.success) {
            throw new Error(result.message || 'Pesan belum berhasil dikirim. Silakan coba kembali.');
          }

          contactForm.reset();
          if (status) {
            status.textContent = 'Pesan berhasil dikirim. Tim PT Kunci Daya Kreasi akan menerima pesan Anda.';
            status.style.color = 'green';
          }
          this.showToast('Terima kasih. Pesan Anda berhasil dikirim ke PT Kunci Daya Kreasi.');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengirim pesan.';
          if (status) {
            status.textContent = errorMessage;
            status.style.color = '#b42318';
          }
          this.showToast(errorMessage);
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = 'Kirim Pesan →';
        }
      });
    }
  }
}

// Instantiate application on window load
window.addEventListener('DOMContentLoaded', () => {
  new KDKWebsiteApp();
});
