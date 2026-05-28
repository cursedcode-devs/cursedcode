Add-Type -AssemblyName System.Drawing
$images = Get-ChildItem -Path "assets\images" | Where-Object { $_.Length -gt 2MB -and $_.Extension -match '\.(png|jpg)' }

foreach ($img in $images) {
    try {
        $image = [System.Drawing.Image]::FromFile($img.FullName)
        
        # Scale down if width > 1200
        $newWidth = [math]::Min($image.Width, 1200)
        $newHeight = [int]($image.Height * ($newWidth / $image.Width))
        
        $newImage = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($newImage)
        
        # High quality scaling
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)
        
        $image.Dispose()
        $graphics.Dispose()
        
        # Convert to jpg to save space
        $newPath = $img.FullName -replace '\.(png|jpg)$', '.jpg'
        
        # We need encoder parameters for quality. For simplicity we just use default Jpeg which is usually ~75
        $newImage.Save($newPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        $newImage.Dispose()
        
        # If it was png, we delete the original png. If it was a huge jpg, we overwrite it.
        if ($img.Extension -eq '.png' -or $img.FullName -eq $newPath) {
            Remove-Item $img.FullName -Force
        }
        Write-Output "Compressed: $($img.Name)"
    } catch {
        Write-Output "Failed to compress: $($img.Name) - $_"
    }
}
