$deleteBuildCache = Read-Host "Do you want to delete the docker build cache? (y/N)"
if ($deleteBuildCache -eq 'y') {
    Write-Progress -Status "Deleting Docker build cache" -PercentComplete 0 -Activity "Deleting cache"
    docker builder prune --all --force | Out-Null
    Write-Progress -PercentComplete 100 -Activity "Cache deleted"
} else {
    Write-Host "Docker build cache deletion skipped."
}

docker compose -f "./docker/docker-compose.yml" build

# Ask the user if they want to push the images
$pushImages = Read-Host "Do you want to push all the built images? (y/N)"
if ($pushImages -eq 'y') {
    Write-Progress -Status "Uploading images to Docker Hub" -PercentComplete 0 -Activity "Uploading images"
    
    # Inicia el proceso en segundo plano y suprime la salida
    $process = Start-Process -FilePath "docker" -ArgumentList "compose", "-f", "./docker/docker-compose.yml", "push" -RedirectStandardOutput "NUL" -RedirectStandardError "error.log" -PassThru -NoNewWindow

    # Actualiza el progreso mientras el proceso está en ejecución
    while (!$process.HasExited) {
        # Simula un progreso del 0 al 100%
        for ($i = 0; $i -le 100; $i += 10) {
            Write-Progress -Status "Uploading images to Docker Hub" -PercentComplete $i -Activity "Uploading images"
            Start-Sleep -Seconds 1
        }
    }

    Write-Progress -PercentComplete 100 -Activity "Images uploaded"
    Write-Host "Docker images uploaded"
}