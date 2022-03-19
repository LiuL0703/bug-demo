
class AppManager {
  subApps = {}
  subAppModules = {}
  registerApp = (subApp) => {
    this.subApps[subApp.name] = subApp
  }
  loadSubApp = (subAppInfo) => {
    const { name, host } = typeof subAppInfo === 'string'? this.subApps[subAppInfo] : subAppInfo
    if (!this.subAppModules[name]) {
      this.subAppModules[name] = new Promise((resolve, reject)=> {
        fetch(`${host}/${name}/asset-manifest.json`)
        .then(res => res.json())
        .then(manifest => {
          const script = document.createElement('script');
          script.src = `${host}${manifest.files['main.js']}`;

          const timeout = setTimeout(()=>{
            console.error(`MicroApp ${name} timeout`);
            reject(new Error(`MicroApp ${name} timeout`));
          }, 10000)
          script.onload = () => {
            clearTimeout(timeout)
            const app = window[name]
            console.log(`MicroApp ${name} loaded success`);
            resolve(app)
          }
          script.onerror = (e) => {
            clearTimeout(timeout);
            console.error(`MicroApp ${name} loaded error`, e);
            reject(e)
          }
          document.body.appendChild(script);
        })
      })
    }
    return this.subAppModules[name]
  }
}

export default new AppManager()