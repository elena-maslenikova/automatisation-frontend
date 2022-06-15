import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
	public downloadFile(data: Blob): void {
		const link: HTMLAnchorElement = document.createElement('a');
		link.style.display = 'none';
		document.body.appendChild(link);
		link.href = window.URL.createObjectURL(data);
		link.setAttribute('download', `Модель угроз`);
		link.click();
		window.URL.revokeObjectURL(link.href);
		document.body.removeChild(link);
	}
}
