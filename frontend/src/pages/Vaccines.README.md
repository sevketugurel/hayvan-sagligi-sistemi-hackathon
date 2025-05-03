# Vaccines Page (Aşılar Sayfası)

Bu sayfa, hayvan sağlığı sisteminde kayıtlı olan aşıları görüntülemek ve yönetmek için kullanılır. Tasarım olarak reçeteler sayfası ile aynı yapıya sahiptir.

## Özellikler

- Tamamlanmış ve planlanan aşıları görüntüleme
- Aşıları filtreleme (Tümü, Tamamlanan, Planlanan)
- Aşı detaylarını görüntüleme
- Aşı raporu yazdırma
- Yeni aşı ekleme
- Planlanan aşıları tamamlandı olarak işaretleme

## Kullanım

1. Üst menüden "Aşılar" linkine tıklayarak sayfaya erişebilirsiniz
2. Filtreleme butonlarını kullanarak istediğiniz aşı türlerini görüntüleyebilirsiniz
3. "Yeni Aşı Ekle" butonuna tıklayarak yeni aşı kaydı oluşturabilirsiniz
4. Her aşı kartı üzerindeki butonları kullanarak yazdırma, detay görüntüleme ve durum güncelleme işlemlerini yapabilirsiniz

## Teknik Bilgiler

Bu sayfa React ile geliştirilmiştir ve backend entegrasyonu için hazırdır. Şu anda örnek verilerle çalışmaktadır, ancak gerçek bir API entegrasyonu kolaylıkla yapılabilir.

Stillemeler için `Vaccinations.css` dosyası kullanılmaktadır ve sayfa responsive tasarıma sahiptir. 