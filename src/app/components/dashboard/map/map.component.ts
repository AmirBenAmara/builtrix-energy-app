import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ApiService } from '../../../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule, HttpClientModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  buildings = [];
  constructor(private apiService: ApiService) {}

 
  ngOnInit(): void {
    this.initMap();    
  }

  initMap(){
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '../assets/images/marker-icon-2x.png',
      iconUrl: '../assets/images/marker-icon.png',
      shadowUrl: '../assets/images/marker-shadow.png',
    });

    const map = L.map('map', {
      center: [38, 9],
      zoom: 5,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    this.apiService.getBuildings().subscribe((res) => {
      this.buildings = res;
      this.buildings.forEach((building) => {
        const marker = L.marker([building['lat'], building['lon']]).addTo(map);
        marker.bindPopup(`<b>Building Name:</b> ${building['name']}<br>
        <b>total area:</b> ${building['totalarea']}<br>
        <b>cpe:</b> ${building['cpe']}<br>
        <b>Latitude:</b> ${building['lat']}<br>
        <b>Longitude:</b> ${building['lon']}<br>
        <b>Full Address:</b> ${building['fulladdress']}`); // Optional: Display building name on click
      });
    });
  }

}
