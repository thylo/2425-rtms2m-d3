export interface Root {
    geo_point_2d: GeoPoint2d
    geo_shape: GeoShape
    year: string
    reg_code: string[]
    prov_code?: string[]
    arr_code: string[]
    can_code: any
    mun_code: string[]
    mun_area_code: string
    mun_type: string
    mun_off_language: string[]
    mun_name_fr: string[]
    mun_name_lower_fr: string
    mun_name_upper_fr: string
    mun_name_nl: string[]
    mun_name_upper_nl: string
    mun_name_lower_nl: string
    mun_name_de: string[]
    mun_name_lower_de: string
    mun_name_upper_de: string
    reg_name_de: string[]
    reg_name_nl: string[]
    reg_name_fr: string[]
    prov_name_de?: string[]
    prov_name_nl?: string[]
    prov_name_fr?: string[]
    arr_name_de: string[]
    arr_name_nl: string[]
    arr_name_fr: string[]
}

export interface GeoPoint2d {
    lon: number
    lat: number
}

export interface GeoShape {
    type: string
    geometry: Geometry
    properties: Properties
}

export interface Geometry {
    coordinates: any[][][]
    type: string
}

export interface Properties {}
