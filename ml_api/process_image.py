from PIL import Image, ImageFilter
import io

def process_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))

    processed_image = image.filter(ImageFilter.BLUR)

    img_byte_arr = io.BytesIO()
    processed_image.save(img_byte_arr, format='PNG')
    img_byte_arr = img_byte_arr.getvalue()

    return img_byte_arr
