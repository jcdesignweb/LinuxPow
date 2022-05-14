import { Package } from "../models";

export const createPackageAdapter = (packageProgram: Package) => ({
    name: packageProgram.name,
    description: packageProgram.description,
    isInstalled: packageProgram.isInstalled,
    cmd: packageProgram.command 
})

export const createAdapterFromArray = (packages: Package[]) : any => {
    
    return packages.map((pack: Package) => createPackageAdapter(pack))
}