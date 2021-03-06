/*
* Scroll Swipe Protection: A JQuery plugin for uninterrupted web page scrolling.
*
* By: Stefan Winkler (https://github.com/Sigma-90)
* Version: 1.0
* Updated: April 16th, 2016
*
* Copyright 2016 Stefan Winkler
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* Credits:
* Touch-Drag Icon made by Freepik (http://www.freepik.com) from www.flaticon.com is licensed by Creative Commons BY 3.0
*
*/
(function($){
  $.isTouchDevice = function(){
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
  };
  $.fn.extend({
    scrollSwipeProtection: function(options){
      var settings = $.extend({
        createWrapper: false,
        createButton: true,
        protectionToggleType: 'both',
        hoverTimeoutMs: 1200,
        toggleButtonPosition: 'top-right',
        toggleButtonColor: '#EEEEEE',
        toggleButtonHoverColor: '#CCCCCC',
        toggleButtonPadding: '10px 12px',
        toggleButtonImgSrcTouch: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDM5OS4wNyAzOTkuMDciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM5OS4wNyAzOTkuMDc7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij4KPGc+Cgk8cGF0aCBkPSJNMzY1LjA4Myw3NC4wMTFMMzQ4LjExMyw1Ny4wNGMtMy45MDYtMy45MDQtMTAuMjM2LTMuOTA0LTE0LjE0MywwYy0zLjg3MywzLjg3My0zLjg5OSwxMC4xMjktMC4wOTEsMTQuMDQyaC0yMi4zNjUgICBjLTUuNTIyLDAtMTAsNC40NzctMTAsMTBjMCw1LjUyMyw0LjQ3OCwxMCwxMCwxMGgyMi4zNjVjLTMuODA5LDMuOTEzLTMuNzgyLDEwLjE2OSwwLjA5MSwxNC4wNDIgICBjMS45NTMsMS45NTIsNC41MTIsMi45MjksNy4wNzEsMi45MjljMi41NiwwLDUuMTE4LTAuOTc3LDcuMDcxLTIuOTI5bDE2Ljk3MS0xNi45NzFDMzY4Ljk4OCw4NC4yNDgsMzY4Ljk4OCw3Ny45MTYsMzY1LjA4Myw3NC4wMTEgICB6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cGF0aCBkPSJNMjI1Ljc0NywxMDUuMTI0YzEuOTUzLDEuOTUyLDQuNTEyLDIuOTI5LDcuMDcxLDIuOTI5YzIuNTYsMCw1LjExOC0wLjk3Nyw3LjA3MS0yLjkyOSAgIGMzLjg3My0zLjg3MywzLjg5OS0xMC4xMjksMC4wOTEtMTQuMDQyaDIyLjM2NWM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwYzAtNS41MjMtNC40NzgtMTAtMTAtMTBoLTIyLjM2NSAgIGMzLjgwOS0zLjkxMywzLjc4Mi0xMC4xNjktMC4wOTEtMTQuMDQyYy0zLjkwNi0zLjkwNC0xMC4yMzYtMy45MDQtMTQuMTQzLDBsLTE2Ljk3MSwxNi45NzFjLTMuOTA1LDMuOTA1LTMuOTA1LDEwLjIzNywwLDE0LjE0MyAgIEwyMjUuNzQ3LDEwNS4xMjR6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cGF0aCBkPSJNMjg2LjkzLDk1LjY2NmMtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHYyMi4zNjVjLTMuOTEzLTMuODA5LTEwLjE2OC0zLjc4Mi0xNC4wNDIsMC4wOTEgICBjLTMuOTA1LDMuOTA1LTMuOTA1LDEwLjIzNywwLDE0LjE0M2wxNi45NzEsMTYuOTcxYzEuOTUzLDEuOTUzLDQuNTEyLDIuOTI5LDcuMDcxLDIuOTI5YzIuNTYsMCw1LjExOC0wLjk3Niw3LjA3MS0yLjkyOSAgIGwxNi45NzEtMTYuOTcxYzMuOTA1LTMuOTA1LDMuOTA1LTEwLjIzNywwLTE0LjE0M2MtMy44NzQtMy44NzMtMTAuMTI5LTMuOS0xNC4wNDItMC4wOTF2LTIyLjM2NSAgIEMyOTYuOTMsMTAwLjE0MywyOTIuNDUyLDk1LjY2NiwyODYuOTMsOTUuNjY2eiIgZmlsbD0iIzAwMDAwMCIvPgoJPHBhdGggZD0iTTI3Ni45MywzNC4xMzN2MjIuMzY1YzAsNS41MjMsNC40NzgsMTAsMTAsMTBjNS41MjIsMCwxMC00LjQ3NywxMC0xMFYzNC4xMzNjMS45NCwxLjg4OSw0LjQ1MywyLjgzOCw2Ljk3MSwyLjgzOCAgIGMyLjU2LDAsNS4xMTgtMC45NzYsNy4wNzEtMi45MjljMy45MDUtMy45MDUsMy45MDUtMTAuMjM3LDAtMTQuMTQzTDI5NC4wMDEsMi45MjljLTMuOTA2LTMuOTA1LTEwLjIzNi0zLjkwNS0xNC4xNDIsMCAgIEwyNjIuODg4LDE5LjljLTMuOTA1LDMuOTA1LTMuOTA1LDEwLjIzNywwLDE0LjE0M0MyNjYuNzYyLDM3LjkxNSwyNzMuMDE3LDM3Ljk0MiwyNzYuOTMsMzQuMTMzeiIgZmlsbD0iIzAwMDAwMCIvPgoJPHBhdGggZD0iTTI3Ni40MDMsMTg0Ljg0N2MtNS41NzIsMC0xMS4yMiwxLjA3Mi0xNi41MDgsMy4wNjVjLTcuMzUxLTE0LjQzMS0yMi4zNDQtMjQuMzM4LTM5LjYwNC0yNC4zMzggICBjLTYuMTUyLDAtMTIuMDE1LDEuMTY2LTE3LjM0NCwzLjI3MWMtNy40OTQtMTQuMDA1LTIyLjI3NC0yMy41NTgtMzkuMjQ0LTIzLjU1OGMtNC4yNTEsMC04LjQxNCwwLjU5NC0xMi4zOTQsMS43NDMgICBjMC4wMDQtNC45NzQsMC4wMDgtMTAuMTAzLDAuMDEyLTE1LjIyNWwwLjAyOC0zOS44NTZjMC4wMDgtMTAuNjM3LDAuMDExLTE1LjU2Mi0wLjAzMy0xOC4xMDloMC4wNDMgICBjMC0yMi43MTEtMTkuODQ5LTQxLjE4OC00NC4yNDYtNDEuMTg4Yy0yNC41MjEsMC00NC40NzEsMTkuOTUtNDQuNDcxLDQ0LjQ3MnYxMzUuNTY5Yy0xNi4zNzUsNS40NzktMzAuODMsMjAuNTkzLTMxLjQzNiw0Mi4xNjkgICBjLTAuOTQ5LDMzLjc1MiwxLjgxNiw3Ni40NjIsMzEuODkzLDEwNy4zOTZjMjUuMzkxLDI2LjExNCw2NS4xMjcsMzguODA5LDEyMS40ODIsMzguODA5YzUwLjY4NCwwLDg4LjE2OS0xNC45MDksMTExLjQxNC00NC4zMTEgICBjMTYuMzI2LTIwLjY1MSwyNC45NTUtNDguNDgsMjQuOTU1LTgwLjQ4bC0wLjA3OC00NC45OTVDMzIwLjg3MywyMDQuNzk3LDMwMC45MjQsMTg0Ljg0NywyNzYuNDAzLDE4NC44NDd6IE0xODQuNTgyLDM3OS4wNyAgIGMtMTE5LjMxMSwwLTEzNS4yMTctNjAuNDc4LTEzMy4zODMtMTI1LjY0NGMwLjQ0MS0xNS43MTcsMTMuOTUzLTI1LDI1LTI1djI4LjgyM2MwLDMuNjI1LDIuNTE0LDQuMDQ3LDMuMjY0LDQuMDQ3ICAgczMuMTgtMC40MTIsMy4xOC00LjAzOGMwLTMuNDk5LDAtMTgyLjEzMiwwLTE4Mi4xMzJjMC0xMy41MTUsMTAuOTU1LTI0LjQ3MiwyNC40NzEtMjQuNDcyYzEyLjQwMiwwLDI0LjI0Niw4Ljg4MSwyNC4yNDYsMjEuMTg4ICAgYzAuMDA4LDAuMDQ1LTAuMDY0LDg5Ljg2LTAuMDc2LDExMS45NTdjLTAuMDAyLDAuMDQ2LTAuMDE0LDAuMDg5LTAuMDE0LDAuMTM1djQuNjE3YzAsMi4yMDEsMS43ODUsMy45ODUsMy45ODYsMy45ODUgICBjMi4xOTksMCwzLjk4NC0xLjc4NCwzLjk4NC0zLjk4NXYtMS4xOTRjMC4yMTctMTMuMzI4LDExLjA4Mi0yNC4wNjcsMjQuNDYzLTI0LjA2N2MxMy41MTQsMCwyNC40NzMsMTAuOTU3LDI0LjQ3MywyNC40NzMgICBsMC4wMTgsMTcuNzIxYzAsMi4xNjgsMS43NTgsMy45MjUsMy45MjYsMy45MjVjMi4xNjYsMCwzLjkyNC0xLjc1NywzLjkyNC0zLjkyNWwtMC4wMDgtMS4wMTQgICBjMC0xMi4zMDUsMTEuOTU1LTIwLjg5NCwyNC4yNTYtMjAuODk0YzEzLjUxNiwwLDI0LjQyMiwxMC45NTYsMjQuNDIyLDI0LjQ3MmwwLjA0OSwxNy45MzdjMCwyLjEwOSwxLjcwOSwzLjgxOSwzLjgxOCwzLjgxOSAgIGMyLjEwOSwwLDMuODE4LTEuNzEsMy44MTgtMy44MTlsLTAuMDE0LTEuMzY1YzAtMTEuMTksMTIuMTA5LTE5Ljc3MSwyNC4wMTgtMTkuNzcxYzEzLjUxNCwwLDI0LjQ3MSwxMC45NTcsMjQuNDcxLDI0LjQ3MiAgIGwwLjA3OCw0NC45NkMzMDAuOTUxLDMxNi4wOTQsMjg0LjY5LDM3OS4wNywxODQuNTgyLDM3OS4wN3oiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K',
        toggleButtonImgSrcScroll: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB2ZXJzaW9uPSIxLjEiCiAgIHdpZHRoPSIyNTYiCiAgIGhlaWdodD0iMjU2IgogICBpZD0ic3ZnMiI+CiAgPGRlZnMKICAgICBpZD0iZGVmczQiIC8+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNyI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC03OTYuMzYyMTgpIgogICAgIGlkPSJsYXllcjEiPgogICAgPHBhdGgKICAgICAgIGQ9Im0gMTI3Ljk0MTg0LDg4My4wODA5MyBjIC0xMS44MTk0OSwwIC0yMS40NTE2Miw5LjYyNjUgLTIxLjYzMzgsMjEuNTc3MzQgLTAuMDAyLDAuMTE1MTIgMCwwLjIzMDQ0IDAsMC4zNDU5OSBsIDAsMzguODE0MDUgMCwxLjQ0Njg4IDAuMDYyLDAgYyAwLjczMDU3LDExLjQzOTMgMTAuMTE1MTIsMjAuNDc2NDUgMjEuNTcxODEsMjAuNDc2NDUgMTEuNDU2NywwIDIwLjgxMDI1LC05LjAzNzE1IDIxLjU0MDgzLC0yMC40NzY0NSBsIDAuMDYyLDAgMCwtMS40NDY4OCAwLC0zOC44MTQwNSBjIDAsLTAuMTE1NTUgMC4wMDIsLTAuMjMwODcgMCwtMC4zNDU5OSAtMC4xODIxNywtMTEuOTUwODQgLTkuNzgzMzIsLTIxLjU3NzM0IC0yMS42MDI4MSwtMjEuNTc3MzQgeiIKICAgICAgIGlkPSJyZWN0Mjk5MCIKICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmUiIC8+CiAgICA8dGV4dAogICAgICAgeD0iOTYuNjQ0NzY4IgogICAgICAgeT0iODYyLjcxMDYzIgogICAgICAgaWQ9InRleHQzMDIwIgogICAgICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIKICAgICAgIHN0eWxlPSJmb250LXNpemU6NjMuMzI1NzQwODFweDtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDpub3JtYWw7bGluZS1oZWlnaHQ6MTI1JTtsZXR0ZXItc3BhY2luZzowcHg7d29yZC1zcGFjaW5nOjBweDtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7Zm9udC1mYW1pbHk6U2FucyI+PHRzcGFuCiAgICAgICAgIHg9Ijk2LjY0NDc2OCIKICAgICAgICAgeT0iODYyLjcxMDYzIgogICAgICAgICBpZD0idHNwYW4zMDIyIj7ilrI8L3RzcGFuPjwvdGV4dD4KICAgIDx0ZXh0CiAgICAgICB4PSI5Ni44NzcyODEiCiAgICAgICB5PSIxMDI4LjYwMjQiCiAgICAgICBpZD0idGV4dDMwMjQiCiAgICAgICB4bWw6c3BhY2U9InByZXNlcnZlIgogICAgICAgc3R5bGU9ImZvbnQtc2l6ZTo2Mi45NjIyODQwOXB4O2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0Om5vcm1hbDtsaW5lLWhlaWdodDoxMjUlO2xldHRlci1zcGFjaW5nOjBweDt3b3JkLXNwYWNpbmc6MHB4O2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtmb250LWZhbWlseTpTYW5zIj48dHNwYW4KICAgICAgICAgeD0iOTYuODc3MjgxIgogICAgICAgICB5PSIxMDI4LjYwMjQiCiAgICAgICAgIGlkPSJ0c3BhbjMwMjYiPuKWvDwvdHNwYW4+PC90ZXh0PgogICAgPHRleHQKICAgICAgIHg9Ijg5Mi42ODk5NCIKICAgICAgIHk9Ii0yMy40ODU4NjUiCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLDEsLTEsMCwwLDApIgogICAgICAgaWQ9InRleHQzMDI0LTciCiAgICAgICB4bWw6c3BhY2U9InByZXNlcnZlIgogICAgICAgc3R5bGU9ImZvbnQtc2l6ZTo2Mi45NjIyODQwOXB4O2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0Om5vcm1hbDtsaW5lLWhlaWdodDoxMjUlO2xldHRlci1zcGFjaW5nOjBweDt3b3JkLXNwYWNpbmc6MHB4O2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtmb250LWZhbWlseTpTYW5zIj48dHNwYW4KICAgICAgICAgeD0iODkyLjY4OTk0IgogICAgICAgICB5PSItMjMuNDg1ODY1IgogICAgICAgICBpZD0idHNwYW4zMDI2LTQiPuKWvDwvdHNwYW4+PC90ZXh0PgogICAgPHBhdGgKICAgICAgIGQ9Im0gMTg5LjQ0MTk3LDkwMi4wMjI4OSAwLDQzLjY1NjI1IDQzLjYyNSwtMjEuODEyNSAtNDMuNjI1LC0yMS44NDM3NSB6IgogICAgICAgaWQ9InRleHQzMDI0LTAiCiAgICAgICBzdHlsZT0iZm9udC1zaXplOjYyLjk2MjI4NDA5cHg7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6bm9ybWFsO2xpbmUtaGVpZ2h0OjEyNSU7bGV0dGVyLXNwYWNpbmc6MHB4O3dvcmQtc3BhY2luZzowcHg7ZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO2ZvbnQtZmFtaWx5OlNhbnMiIC8+CiAgPC9nPgo8L3N2Zz4K',
        toggleButtonImgSrcDenied: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB2ZXJzaW9uPSIxLjEiCiAgIHdpZHRoPSIyMCIKICAgaGVpZ2h0PSIyMCIKICAgaWQ9InN2ZzMwMjYiPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTMwMzgiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMzMDM2IiAvPgogIDxnCiAgICAgaWQ9ImczMDI4IgogICAgIHN0eWxlPSJzdHJva2U6I2Q0MDAwMDtzdHJva2Utd2lkdGg6Mi4yMzAwMDAwMiI+CiAgICA8cGF0aAogICAgICAgZD0ibSAxMCwwLjMxMjUgYyAtNS4zMzMwMiwwIC05LjY4NzUsNC4zNTQ0OCAtOS42ODc1LDkuNjg3NSAwLDUuMzMzMDIgNC4zNTQ0OCw5LjY4NzUgOS42ODc1LDkuNjg3NSA1LjMzMzAyLDAgOS42ODc1LC00LjM1NDQ4IDkuNjg3NSwtOS42ODc1IDAsLTUuMzMzMDIgLTQuMzU0NDgsLTkuNjg3NSAtOS42ODc1LC05LjY4NzUgeiBtIDAsMi4yNSBjIDEuNjY2MDUsMCAzLjIwMTgzMywwLjUyMzAwNCA0LjQzNzUsMS40Mzc1IEwgNC4wMzEyNSwxNC40Mzc1IEMgMy4xMTAyNjQsMTMuMTk5MzQ4IDIuNTYyNSwxMS42NzI1MzQgMi41NjI1LDEwIDIuNTYyNSw1Ljg3MjE2MTUgNS44NzIxNjE1LDIuNTYyNSAxMCwyLjU2MjUgeiBtIDYuMDMxMjUsMy4wNjI1IGMgMC44OTA1NDYsMS4yMjYyMzU0IDEuNDA2MjUsMi43MzMwMzU1IDEuNDA2MjUsNC4zNzUgMCw0LjEyNzgzOSAtMy4zMDk2NjEsNy40Mzc1IC03LjQzNzUsNy40Mzc1IC0xLjY0MTk2NDUsMCAtMy4xNDg3NjQ2LC0wLjUxNTcwNCAtNC4zNzUsLTEuNDA2MjUgTCAxNi4wMzEyNSw1LjYyNSB6IgogICAgICAgaWQ9ImNpcmNsZTMwMzAiCiAgICAgICBzdHlsZT0iZm9udC1zaXplOm1lZGl1bTtmb250LXN0eWxlOm5vcm1hbDtmb250LXZhcmlhbnQ6bm9ybWFsO2ZvbnQtd2VpZ2h0Om5vcm1hbDtmb250LXN0cmV0Y2g6bm9ybWFsO3RleHQtaW5kZW50OjA7dGV4dC1hbGlnbjpzdGFydDt0ZXh0LWRlY29yYXRpb246bm9uZTtsaW5lLWhlaWdodDpub3JtYWw7bGV0dGVyLXNwYWNpbmc6bm9ybWFsO3dvcmQtc3BhY2luZzpub3JtYWw7dGV4dC10cmFuc2Zvcm06bm9uZTtkaXJlY3Rpb246bHRyO2Jsb2NrLXByb2dyZXNzaW9uOnRiO3dyaXRpbmctbW9kZTpsci10Yjt0ZXh0LWFuY2hvcjpzdGFydDtiYXNlbGluZS1zaGlmdDpiYXNlbGluZTtjb2xvcjojMDAwMDAwO2ZpbGw6IzgwODA4MDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6Mi4yMzAwMDAwMjttYXJrZXI6bm9uZTt2aXNpYmlsaXR5OnZpc2libGU7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlO2ZvbnQtZmFtaWx5OlNhbnM7LWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjpTYW5zIiAvPgogIDwvZz4KPC9zdmc+Cg==',
        toggleButtonImgHeight: '32px',
        toggleButtonImgWidth: '32px',
        onTSEnabled: null,
        onTSDisabled: null
      }, options);
      var is_touch = $.isTouchDevice();
      var toggleButtonImgSrc = is_touch ? settings.toggleButtonImgSrcTouch : settings.toggleButtonImgSrcScroll;
      var max_zi = 0;
      this.each(function(){
        $(this).children().each(function(){
          var zi = $(this).css('z-index');
          if(typeof(zi)!=='undefined' && zi){
            zi = Number(zi);
            if(zi > max_zi){
              max_zi = zi;
            }
          }
        });
      });
      var css_rules = 
          '.touch-scroll-protector{ position: relative; } ' + 
          '.touch-scroll-protector.touch-scroll-blocked:before{ content:""; position:absolute; top:0; left:0; width:100%; height:100%; background-color:rgba(255,255,255,0.01); z-index:'+(max_zi+1)+'; } ';
      if(settings.createButton){  
        css_rules = css_rules +
          '.tsp-btn{ display:block; border:0 none transparent; text-align:center; overflow:hidden; z-index:'+(max_zi+2)+'; padding:'+settings.toggleButtonPadding+'; background-color:'+settings.toggleButtonColor+'; position:absolute; '+(settings.toggleButtonPosition.indexOf('bottom') >= 0 ? 'bottom:0;' : 'top:0;')+' '+(settings.toggleButtonPosition.indexOf('left') >= 0 ? 'left:0;' : 'right:0;')+' } ' + 
          '.tsp-btn > .tsp-btn-icon-wrapper { display:block; position:relative; } ' +
          '.tsp-btn-icon{ display:block; position:relative; z-index:0; width:'+settings.toggleButtonImgWidth+'; height:'+settings.toggleButtonImgHeight+'; } ' + 
          '.tsp-btn.scroll-icon:hover, .tsp-btn:active{ background-color:'+settings.toggleButtonHoverColor+'; } ' + 
          '.tsp-btn-block-overlay{ display:none; } ' + 
          '.touch-scroll-protector.touch-scroll-blocked .tsp-btn-block-overlay{ display:block; position:absolute; top:0; left:0; width:100%; height:100%; z-index:1;  }';
      }
      if(!$('#scrollSwipeProtectionStylesheet').length){
        $('<style id="scrollSwipeProtectionStylesheet" type="text/css">'+css_rules+'</style>').appendTo($('html > head'));
      }
      
      return this.each(function(){
        var $container = $(this);
        if(settings.createWrapper){
          $container.wrap('<div class="touch-scroll-protector touch-scroll-blocked"></div>');
          $container = $container.parent('.touch-scroll-protector');
        }else{
          $container.addClass('touch-scroll-protector touch-scroll-blocked');
        }
        if(settings.createButton){
          var $btn = $('<a href="#toggle-touch-protection" class="tsp-btn '+(is_touch ? 'touch' : 'scroll')+'-icon"><span class="tsp-btn-icon-wrapper"><img class="tsp-btn-icon" alt="T/S" src="'+toggleButtonImgSrc+'" /><img class="tsp-btn-block-overlay" alt="---" src="'+settings.toggleButtonImgSrcDenied+'" /></a>');
          $btn.click(function(e){
            e.preventDefault();
            var $tp = $(this).parent('.touch-scroll-protector');
            if($tp.hasClass('tsp-toggled-off')){
              $tp.addClass('touch-scroll-blocked').removeClass('tsp-toggled-off');
              if(typeof(settings.onTSDisabled)==='function'){
                settings.onTSDisabled();
              }
            }else{
              $tp.removeClass('touch-scroll-blocked').addClass('tsp-toggled-off');
              if(typeof(settings.onTSEnabled)==='function'){
                settings.onTSEnabled();
              }
            }
          });
          $btn.prependTo($container);
        }
        if((settings.protectionToggleType === 'scroll' || settings.protectionToggleType === 'both') && settings.hoverTimeoutMs > 0){
          var hover_timer = null;
          $container.hover(function(e){
            $(this).addClass('tsp-hover');
            hover_timer = setTimeout(function(){
              if($container.hasClass('tsp-hover')){
                $container.removeClass('touch-scroll-blocked');
              }
            }, settings.hoverTimeoutMs);
          },function(e){
            $(this).removeClass('tsp-hover');
            if(!$(this).hasClass('tsp-toggled-off')){
              $(this).addClass('touch-scroll-blocked');
            }
            if(!!hover_timer){
              clearTimeout(hover_timer);
            }
          });
        }
      });
    }
  });
}(jQuery));