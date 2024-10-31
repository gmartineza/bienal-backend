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
    docker compose -f "./docker/docker-compose.yml" push
}