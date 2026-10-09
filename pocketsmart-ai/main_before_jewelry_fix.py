@app.post("/generate-jewelry")
async def generate_jewelry(
    user_id: int = File(...),
    budget: float = File(...),
    jewelry_type: str = File(...),
    occasion: str = File(...),
    style: str = File(...),
    outfit_image: UploadFile = File(None)
):

    result = fallback_jewelry(
        budget,
        jewelry_type,
        occasion,
        style
    )

    image_uploaded = False

    if outfit_image:
        try:
            image_bytes = await outfit_image.read()

            if image_bytes:
                image_uploaded = True

                print(
                    f"Outfit image uploaded: "
                    f"{outfit_image.filename}"
                )

        except Exception as e:
            print(f"IMAGE UPLOAD ERROR: {e}")

    message = "Jewelry recommendations generated successfully"

    if image_uploaded:
        message = (
            "Jewelry recommendations generated successfully "
            "with outfit image"
        )

    save_recommendation(
        user_id,
        "Jewelry",
        budget,
        json.dumps({
            "jewelry_type": jewelry_type,
            "occasion": occasion,
            "style": style,
            "outfit_image": (
                outfit_image.filename
                if outfit_image
                else None
            )
        }),
        result
    )

    return {
        "message": message,
        "budget": budget,
        "jewelry_type": jewelry_type,
        "occasion": occasion,
        "style": style,
        "image_uploaded": image_uploaded,
        "ai_recommendations": result
    }