import { useState, useRef } from 'react'
import "./VideoCall.css"

// Setup Monaco Editor
// Attach YJS Text to Monaco Editor
import "./AgoraRTC_N-4.19.3"
function VideoCall() {
  const APP_ID = "d2058e287f294f02bbd4a86db29e3400" 
  const TOKEN = "007eJxTYOi+cV6Nv6C+PnTb6esS5nP1g5nOxDZWnY9Mb9yxL7PsWp0CQ4qRgalFqpGFeZqRpUmagVFSUopJooVZSpKRZaqxiYFBgXFqakMgI0PnqmwWRgYIBPFZGHITM/MYGAA/GR7+"
  const CHANNEL = "main"

  const client = AgoraRTC.createClient({mode: 'rtc', codec:'vp8'})

  let localTracks = []
  let remoteUsers = {}

  let joinAndDIsplayLocalStream = async ()=> {
    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class = "video-container" id="user-container-${UID}">
                        <div class="video-player" id ="user-${UID}"></div>
                  </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
    localTracks[1].play(`user-${UID}`)
    await client.publish([localTracks[0],localTracks[1]])

  }

  let joinStream = async ()=> {
    await joinAndDIsplayLocalStream()
    document.getElementById('join-btn').style.display = 'none'
    document.getElementById('stream-controls').style.display = 'flex'
  }


  return (
    <>
    <button id="join-btn" onClick={() => joinStream()}>Join Stream</button>
    <div id="stream-wrapper">
      <div id="video-streams"></div>
      <div id="stream-controls">
        <button id="leave-btn">Leave Stream</button>
        <button id="mic-btn">Mic On</button>
        <button id="camera-btn">Camera on</button>
      </div>
    </div>
    </>
  )
  }

export default VideoCall