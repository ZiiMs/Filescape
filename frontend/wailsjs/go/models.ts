export namespace disk {
	
	export class PartitionStat {
	    device: string;
	    mountpoint: string;
	    fstype: string;
	    opts: string;
	
	    static createFrom(source: any = {}) {
	        return new PartitionStat(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.device = source["device"];
	        this.mountpoint = source["mountpoint"];
	        this.fstype = source["fstype"];
	        this.opts = source["opts"];
	    }
	}

}

export namespace main {
	
	export class Directory {
	    name: string;
	    path: string;
	    type: string;
	
	    static createFrom(source: any = {}) {
	        return new Directory(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.path = source["path"];
	        this.type = source["type"];
	    }
	}

}

