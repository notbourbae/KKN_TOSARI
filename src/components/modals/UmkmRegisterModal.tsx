import React, { useState } from 'react';
import { useDusun } from '../../context/DusunContext';
import { UmkmCategory } from '../../types';
import { X, Store, User, Phone, MapPin, Tag, Plus, Trash2, CheckCircle } from 'lucide-react';
import { ImageUploader } from '../ImageUploader';

export const UmkmRegisterModal: React.FC = () => {
  const { showUmkmRegisterModal, setShowUmkmRegisterModal, addUmkmRegistration } = useDusun();

  const [namaUsaha, setNamaUsaha] = useState('');
  const [pemilik, setPemilik] = useState('');
  const [kategori, setKategori] = useState<UmkmCategory>('Makanan dan Minuman');
  const [deskripsi, setDeskripsi] = useState('');
  const [alamat, setAlamat] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [gambar, setGambar] = useState('');
  const [mapUrl, setMapUrl] = useState('');

  // Sample products
  const [produkList, setProdukList] = useState<Array<{ nama: string; harga: number; deskripsi: string; gambar: string }>>([
    { nama: '', harga: 0, deskripsi: '', gambar: '' }
  ]);

  const [success, setSuccess] = useState(false);

  if (!showUmkmRegisterModal) return null;

  const handleAddProductField = () => {
    setProdukList([...produkList, { nama: '', harga: 0, deskripsi: '', gambar: '' }]);
  };

  const handleRemoveProductField = (index: number) => {
    setProdukList(produkList.filter((_, i) => i !== index));
  };

  const handleProductChange = (index: number, field: string, value: any) => {
    const updated = [...produkList];
    updated[index] = { ...updated[index], [field]: value };
    setProdukList(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaUsaha || !pemilik || !whatsapp || !alamat) {
      alert('Mohon lengkapi data wajib: Nama Usaha, Pemilik, Alamat, dan WhatsApp.');
      return;
    }

    addUmkmRegistration({
      namaUsaha,
      pemilik,
      kategori,
      deskripsi: deskripsi || 'Usaha UMKM warga Dusun Sukamaju.',
      alamat,
      whatsapp,
      mapUrl,
      gambar: gambar || 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80',
      produkList: produkList.filter(p => p.nama.trim() !== '')
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowUmkmRegisterModal(false);
      // Reset form
      setNamaUsaha('');
      setPemilik('');
      setDeskripsi('');
      setAlamat('');
      setWhatsapp('');
      setGambar('');
      setMapUrl('');
      setProdukList([{ nama: '', harga: 0, deskripsi: '', gambar: '' }]);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 max-h-[92vh] flex flex-col my-auto">
        
        {/* Header */}
        <div className="bg-emerald-800 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-xs">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Formulir Pendaftaran UMKM Dusun</h2>
              <p className="text-xs text-emerald-200">Daftarkan usaha Anda agar dapat tampil di Portal Resmi Dusun</p>
            </div>
          </div>
          <button
            onClick={() => setShowUmkmRegisterModal(false)}
            className="text-emerald-200 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Alert */}
        {success ? (
          <div className="p-8 text-center space-y-3 my-auto">
            <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-slate-900">Pendaftaran UMKM Berhasil Dikirim!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Data usaha Anda telah masuk ke sistem dan sedang ditinjau oleh Administrator Dusun. Setelah disetujui, UMKM Anda akan otomatis tayang di katalog online.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-900 mb-1">Nama Usaha / Toko <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Keripik Singkong Murni"
                    value={namaUsaha}
                    onChange={e => setNamaUsaha(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:bg-white text-xs"
                  />
                  <Store className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-900 mb-1">Nama Pemilik <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ibu Maryam"
                    value={pemilik}
                    onChange={e => setPemilik(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:bg-white text-xs"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-900 mb-1">Kategori Usaha <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    value={kategori}
                    onChange={e => setKategori(e.target.value as UmkmCategory)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:bg-white text-xs"
                  >
                    <option value="Makanan dan Minuman">Makanan dan Minuman</option>
                    <option value="Kerajinan">Kerajinan</option>
                    <option value="Pertanian">Pertanian</option>
                    <option value="Peternakan">Peternakan</option>
                    <option value="Jasa">Jasa</option>
                  </select>
                  <Tag className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-900 mb-1">Nomor WhatsApp / HP <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:bg-white text-xs"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-900 mb-1">Alamat Lengkap Usaha <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Contoh: RT 02 / RW 01, Dusun Sukamaju"
                  value={alamat}
                  onChange={e => setAlamat(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:bg-white text-xs"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-900 mb-1">Link / Pin Google Maps (Opsional)</label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="Contoh: https://maps.google.com/?q=... atau https://goo.gl/maps/..."
                  value={mapUrl}
                  onChange={e => setMapUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:bg-white text-xs"
                />
                <MapPin className="w-4 h-4 text-red-500 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-900 mb-1">Deskripsi Ringkas Usaha</label>
              <textarea
                rows={3}
                placeholder="Jelaskan keunggulan produk/layanan Anda, bahan baku, varian rasa, dsb."
                value={deskripsi}
                onChange={e => setDeskripsi(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:bg-white text-xs"
              />
            </div>

            <ImageUploader
              label="Foto Sampul Usaha / Toko (Opsional)"
              value={gambar}
              onChange={setGambar}
              placeholder="https://images.unsplash.com/... (Kosongkan untuk foto default)"
            />

            {/* Product samples section */}
            <div className="border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="font-bold text-slate-900 text-xs">Tambah Sampel Produk & Harga</label>
                <button
                  type="button"
                  onClick={handleAddProductField}
                  className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold text-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Produk
                </button>
              </div>

              <div className="space-y-3">
                {produkList.map((prod, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[11px] text-slate-500">Produk #{idx + 1}</span>
                      {produkList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveProductField(idx)}
                          className="text-red-500 hover:text-red-700 p-1 text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Hapus
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Nama Produk"
                        value={prod.nama}
                        onChange={e => handleProductChange(idx, 'nama', e.target.value)}
                        className="bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-xs"
                      />
                      <input
                        type="number"
                        placeholder="Harga (Rp)"
                        value={prod.harga || ''}
                        onChange={e => handleProductChange(idx, 'harga', Number(e.target.value))}
                        className="bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Form Action Buttons */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowUmkmRegisterModal(false)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2 rounded-xl transition-colors shadow-md shadow-emerald-700/20 cursor-pointer"
              >
                Kirim Pendaftaran
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
