import os
import zlib

cert_dir = r"assets\certificates"

def extract_strings(data):
    # Find all printable strings of length >= 3
    strings = []
    curr = []
    for b in data:
        if 32 <= b <= 126:
            curr.append(chr(b))
        else:
            if len(curr) >= 3:
                strings.append("".join(curr))
            curr = []
    if len(curr) >= 3:
        strings.append("".join(curr))
    return strings

for fname in sorted(os.listdir(cert_dir)):
    if not fname.lower().endswith(".pdf"):
        continue
    path = os.path.join(cert_dir, fname)
    with open(path, "rb") as f:
        content = f.read()
    
    # Try decompressing deflate blocks
    all_text = []
    # search for standard zlib headers: 78 9c, 78 01, 78 da
    pos = 0
    while True:
        s_idx = content.find(b"stream", pos)
        if s_idx == -1:
            break
        # skip stream\r?\n
        start = s_idx + 6
        if start < len(content) and content[start:start+2] == b"\r\n":
            start += 2
        elif start < len(content) and content[start:start+1] in (b"\r", b"\n"):
            start += 1
            
        e_idx = content.find(b"endstream", start)
        if e_idx == -1:
            break
            
        block = content[start:e_idx].strip()
        pos = e_idx + 9
        
        try:
            decomp = zlib.decompress(block)
            strs = extract_strings(decomp)
            for s in strs:
                if any(kw in s.lower() for kw in ["certif", "vedant", "birajdar", "course", "date", "c++", "python", "ai", "completion", "nptel", "cisco", "tcs", "nasscom", "imarticus", "gdg", "bms", "dr.", "college", "university"]):
                    all_text.append(s)
        except Exception:
            strs = extract_strings(block)
            for s in strs:
                if any(kw in s.lower() for kw in ["certif", "vedant", "birajdar", "course", "date", "c++", "python", "ai", "completion", "nptel", "cisco", "tcs", "nasscom", "imarticus", "gdg", "bms", "dr.", "college", "university"]):
                    all_text.append(s)

    # Also search uncompressed part
    raw_strs = extract_strings(content)
    for s in raw_strs:
        if any(kw in s.lower() for kw in ["certif", "vedant", "birajdar", "cisco", "nptel", "tcs", "imarticus", "gdg", "bms"]):
            if s not in all_text:
                all_text.append(s)

    print(f"==================== {fname} ====================")
    for line in all_text[:20]:
        print("  *", line)
