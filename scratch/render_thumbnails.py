import os
import pypdfium2 as pdfium

cert_dir = r"assets\certificates"
thumb_dir = r"assets\certificates\thumbnails"
pub_thumb_dir = r"public\certificates\thumbnails"
pub_asset_thumb_dir = r"public\assets\certificates\thumbnails"

os.makedirs(thumb_dir, exist_ok=True)
os.makedirs(pub_thumb_dir, exist_ok=True)
os.makedirs(pub_asset_thumb_dir, exist_ok=True)

files = [f for f in os.listdir(cert_dir) if f.lower().endswith(".pdf")]
print(f"Rendering {len(files)} certificates...")

for fname in sorted(files):
    pdf_path = os.path.join(cert_dir, fname)
    pdf = pdfium.PdfDocument(pdf_path)
    page = pdf[0]
    # Render at high scale (scale=2.5 or 3 for crystal clear rendering)
    image = page.render(scale=2.5).to_pil()
    
    base_name = os.path.splitext(fname)[0]
    out_name = f"{base_name}.jpg"
    
    out_path = os.path.join(thumb_dir, out_name)
    pub_path = os.path.join(pub_thumb_dir, out_name)
    pub_asset_path = os.path.join(pub_asset_thumb_dir, out_name)
    
    image.save(out_path, "JPEG", quality=92)
    image.save(pub_path, "JPEG", quality=92)
    image.save(pub_asset_path, "JPEG", quality=92)
    print(f"Rendered: {out_name} ({image.width}x{image.height})")

print("All thumbnails rendered successfully!")
