const renderer = {
    imageName: "",
    keySuffix: "RendersCount",
    key: "",
    currentCount: null,

    init(imageName) {
        this.imageName = imageName;
    },

    constructKey() {
        return `${this.imageName}${this.keySuffix}`;
    },
    
    constructFileName() {
        return `${this.imageName}_${this.currentCount}`;
    },

    getFromMemory() {
        return localStorage.getItem(this.key);
    },

    updateMemory() {
        localStorage.setItem(this.key, this.currentCount);
    },

    getCurrentCount() {
        // if application has just been launched
        if (this.currentCount === null) {
            const previousCount = this.getFromMemory();
            return previousCount === null ? 0 : int(previousCount) + 1;
        }

        // if application is already running
        return this.currentCount + 1;
    },

    save() {
        this.key = this.constructKey();
        this.currentCount = this.getCurrentCount();
        this.updateMemory(key);
        
        saveCanvas(this.constructFileName(), 'png');
    },

    remove() {
        if (this.key === "") {
            throw "[GSR] key is undefined";
        }
        if (this.getFromMemory() === null) {
            throw "[GSR] nothing is stored in memory";
        }

        localStorage.removeItem(this.key);
    }
};