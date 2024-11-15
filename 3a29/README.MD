```
PORTFOLIO
```


### Build
```
bundle exec jekyll s
```


#### convert mov to frames & scale
```
ffmpeg -i nta80brrrrrr.mov -qmin 1 -qmax 1 -vsync 0 tmp_frames/frame%08d.jpg
```

```
./realesrgan-ncnn-vulkan -i /Users/quick/_art/artbook/assets/keynotes/na9-rintor/frames-original -o /Users/quick/_art/artbook/assets/keynotes/na9-rintor/frames-scaled-2x -s 2
./realesrgan-ncnn-vulkan -i /Users/quick/_art/artbook/assets/keynotes/na9-rintor/frames-original -o /Users/quick/_art/artbook/assets/keynotes/na9-rintor/frames-scaled-4x -s 4
```