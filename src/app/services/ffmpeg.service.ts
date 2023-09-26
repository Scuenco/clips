import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root'
})
export class FfmpegService {
  isRunning = false
  isReady = false
  private ffmpeg

  constructor() {
    this.ffmpeg = createFFmpeg({ log: true })
  }

  async init() {
    if(this.isReady) {
      return
    }
    await this.ffmpeg.load()
    this.isReady = true
  }

  async getScreenshots(file: File) {
    this.isRunning = true
    const data = await fetchFile(file) 
    this.ffmpeg.FS('writeFile', file.name, data) 

    const seconds = [1,2,3]
    const commands: string[] = []

    seconds.forEach(second => {
      commands.push(
      // Input
      '-i', file.name, 
      // Output options
      '-ss', `00:00:0${second}`, 
      '-frames:v', '1', 
      '-filter:v', 'scale=510:-1',
      // Output
      `output_0${second}.png` 
      )
    })

    await this.ffmpeg.run(
      ...commands
    )
    
    /* Creating Screenshot URLs */
    const screenshots: string[] = [] //will contain urls
    seconds.forEach(second => {
      const screenshotFile = this.ffmpeg.FS( //returns binary data
        'readFile', `output_0${second}.png`
      ) 
      //convert binary data into a blob
      const screenshotBlob = new Blob(
        [screenshotFile.buffer], {
          type: 'image/png'
        }
      )
      //convert blob to url
      const screenshotURL = URL.createObjectURL(screenshotBlob)//create a url to a blob
      screenshots.push(screenshotURL)
    })

    this.isRunning = false
    return screenshots
  }
  //convert urls back to blobs
  async blobFromURL(url: string) {
    const response = await fetch(url) //returns a Response object
    const blob = await response.blob() //we can grab the file by running the blob()

    return blob
  }
}
