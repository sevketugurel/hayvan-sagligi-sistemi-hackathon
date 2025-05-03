import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/FormsPage.css';

// Form PDFlerinin bilgileri
const formFiles = {
    anestezi: {
        title: 'Anestezi Formu',
        icon: 'fas fa-syringe',
        description: 'Anestezi sürecinin takibi için gerekli form',
        fileName: 'veteriner_anestezi_kabul_formu.pdf'
    },
    operasyon: {
        title: 'Operasyon Formu',
        icon: 'fas fa-heartbeat',
        description: 'Operasyon detaylarının kaydı için gerekli form',
        fileName: 'veteriner_operasyon_kabul_formu.pdf'
    },
    tedavi: {
        title: 'Tedavi Formu',
        icon: 'fas fa-pills',
        description: 'Tedavi planı ve ilaç takibi için gerekli form',
        fileName: 'veteriner_hasta_tedavi_formu.pdf'
    },
    pansiyon: {
        title: 'Pansiyon Formu',
        icon: 'fas fa-home',
        description: 'Pansiyon hizmeti için gerekli bilgilendirme formu',
        fileName: 'veteriner_hasta_pansiyon_formu.pdf'
    },
    hospitalizasyon: {
        title: 'Hospitalizasyon Formu',
        icon: 'fas fa-procedures',
        description: 'Yatılı tedavi sürecinin yönetimi için form',
        fileName: 'veteriner_hospitasyon_formu.pdf'
    }
};

// Boş bir PDF dosyası oluşturmak için kullanacağımız base64 veri
const emptyPdfBase64 = "data:application/pdf;base64,JVBERi0xLjcKJeTjz9IKNSAwIG9iago8PAovVHlwZSAvWE9iamVjdAovU3VidHlwZSAvSW1hZ2UKL1dpZHRoIDEyNDAKL0hlaWdodCAxNzU0Ci9Db2xvclNwYWNlIC9EZXZpY2VSR0IKL0JpdHNQZXJDb21wb25lbnQgOAovRmlsdGVyIC9EQ1REZWNvZGUKL0xlbmd0aCAzMzgxNAo+PgpzdHJlYW0KSUVORFIKJQolCiVFbXB0eSBQREYgRG9jdW1lbnQKJQolCmVuZHN0cmVhbQplbmRvYmoKCjEgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDIgMCBSCj4+CmVuZG9iagoKMiAwIG9iago8PAovVHlwZSAvUGFnZXMKL0tpZHMgWzMgMCBSXQovQ291bnQgMQo+PgplbmRvYmoKCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUgODQyXQovQ29udGVudHMgNCAwIFIKL1Jlc291cmNlcyA8PAovRm9udCA8PAovRjEgNSAwIFIKPj4KPj4KPj4KZW5kb2JqCgo0IDAgb2JqCjw8Ci9MZW5ndGggMTA0Cj4+CnN0cmVhbQpCVAovRjEgMTIgVGYKMTAwIDc1MCBUZAooRW1wdHkgUERGIERvY3VtZW50KSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCgo1IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovQmFzZUZvbnQgL0hlbHZldGljYQo+PgplbmRvYmoKCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMDY0IDAwMDAwIG4gCjAwMDAwMDAxMjMgMDAwMDAgbiAKMDAwMDAwMDI1MSAwMDAwMCBuIAowMDAwMDAwNDA1IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDgxCiUlRU9GCg==";

const FormsPage = () => {
    const { formType } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [newFormName, setNewFormName] = useState('');
    const [newFormType, setNewFormType] = useState('other');
    const [newFormFile, setNewFormFile] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Form indirme işlemi
    const handleFormDownload = (formKey) => {
        setMessage(`${formFiles[formKey].title} indiriliyor...`);
        setShowMessage(true);

        try {
            // PDF dosyasının yolunu oluştur
            const pdfUrl = `/forms/${formFiles[formKey].fileName}`;

            // PDF dosyasını indir
            fetch(pdfUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('PDF dosyası bulunamadı');
                    }
                    return response.blob();
                })
                .then(blob => {
                    // PDF'i indirme işlemi
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${formFiles[formKey].title}.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);

                    // Mesajı güncelle
                    setMessage(`${formFiles[formKey].title} başarıyla indirildi!`);

                    // Mesajı 3 saniye sonra gizle
                    setTimeout(() => {
                        setShowMessage(false);
                    }, 3000);
                })
                .catch(error => {
                    console.error("İndirme hatası:", error);
                    setMessage(`${formFiles[formKey].title} indirilirken bir hata oluştu. Lütfen tekrar deneyin.`);

                    setTimeout(() => {
                        setShowMessage(false);
                    }, 3000);
                });
        } catch (error) {
            console.error("İndirme hatası:", error);
            setMessage(`${formFiles[formKey].title} indirilirken bir hata oluştu. Lütfen tekrar deneyin.`);

            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }
    };

    // Yeni form yükleme
    const handleFormUpload = (e) => {
        e.preventDefault();

        // Form yükleme işlemini simüle et
        setMessage(`"${newFormName}" formu başarıyla sisteme eklendi!`);
        setShowMessage(true);
        setShowUploadModal(false);

        // Form değerlerini sıfırla
        setNewFormName('');
        setNewFormType('other');
        setNewFormFile(null);

        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    // Eğer direkt olarak form sayfasına yönlendirme varsa
    React.useEffect(() => {
        if (formType && formFiles[formType]) {
            handleFormDownload(formType);
        }
    }, [formType]);

    // Formları arama sonuçlarına göre filtrele
    const filteredForms = Object.keys(formFiles).filter(key => {
        return formFiles[key].title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formFiles[key].description.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="forms-page-container">
            {/* Bildirim Mesajı */}
            {showMessage && (
                <div className={`form-message ${message.includes('hata') ? 'error' : 'success'}`}>
                    <p>{message}</p>
                </div>
            )}

            {/* Form Yükleme Modal */}
            {showUploadModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Yeni Form Ekle</h2>
                            <button className="modal-close" onClick={() => setShowUploadModal(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <form onSubmit={handleFormUpload} className="upload-form">
                            <div className="form-group">
                                <label htmlFor="formName">Form Adı</label>
                                <input
                                    type="text"
                                    id="formName"
                                    value={newFormName}
                                    onChange={(e) => setNewFormName(e.target.value)}
                                    placeholder="Örn: Hasta Takip Formu"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="formType">Form Tipi</label>
                                <select
                                    id="formType"
                                    value={newFormType}
                                    onChange={(e) => setNewFormType(e.target.value)}
                                    required
                                >
                                    <option value="anestezi">Anestezi Formu</option>
                                    <option value="operasyon">Operasyon Formu</option>
                                    <option value="tedavi">Tedavi Formu</option>
                                    <option value="pansiyon">Pansiyon Formu</option>
                                    <option value="hospitalizasyon">Hospitalizasyon Formu</option>
                                    <option value="other">Diğer</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="formFile">Form Dosyası</label>
                                <div className="file-input-container">
                                    <input
                                        type="file"
                                        id="formFile"
                                        accept=".pdf"
                                        onChange={(e) => setNewFormFile(e.target.files[0])}
                                        required
                                    />
                                    <label htmlFor="formFile" className="file-input-label">
                                        {newFormFile ? newFormFile.name : "PDF Dosyası Seçin"}
                                    </label>
                                </div>
                                <p className="file-hint">Yalnızca PDF formatı desteklenmektedir.</p>
                            </div>

                            <div className="form-buttons">
                                <button type="button" className="cancel-btn" onClick={() => setShowUploadModal(false)}>
                                    İptal
                                </button>
                                <button type="submit" className="submit-btn">
                                    Formu Yükle
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="forms-header">
                <h1>Formlar</h1>
                <p>Klinik işlemleri için gerekli formlar</p>

                <div className="forms-actions">
                    <div className="search-box">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Form ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <button className="add-form-btn" onClick={() => setShowUploadModal(true)}>
                        <i className="fas fa-plus"></i>
                        Form Ekle
                    </button>
                </div>
            </div>

            {filteredForms.length > 0 ? (
                <div className="forms-list">
                    {filteredForms.map((key) => (
                        <div className="form-item" key={key}>
                            <div className="form-item-icon">
                                <i className={formFiles[key].icon}></i>
                            </div>
                            <div className="form-item-content">
                                <h3>{formFiles[key].title}</h3>
                                <p>{formFiles[key].description}</p>
                            </div>
                            <div className="form-item-actions">
                                <button
                                    className="view-btn"
                                    title="Görüntüle"
                                    onClick={() => handleFormDownload(key)}
                                >
                                    <i className="fas fa-eye"></i>
                                </button>
                                <button
                                    className="download-btn"
                                    title="İndir"
                                    onClick={() => handleFormDownload(key)}
                                >
                                    <i className="fas fa-download"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-forms">
                    <i className="fas fa-search"></i>
                    <p>Aramanızla eşleşen form bulunamadı.</p>
                </div>
            )}
        </div>
    );
};

export default FormsPage;