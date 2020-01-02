import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  forwardRef
} from "@angular/core";
import { FileProcessingService, FileDetails, FileDimension } from "../services/file-processing.service";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors, FormControl } from "@angular/forms";
import { TranslateService } from '@ngx-translate/core';
import { FileDimensionValidatorService } from '../validators/file-dimension-validator.service';

/**
 * --------------------------------------------------------------------------------------------------------
 * | List of MIME Types by Content Type        |                                         |                |
 * |-------------------------------------------|-----------------------------------------|----------------|
 * | Applications                              |                                         |                |
 * | Application                               | MIME Type                               | File Extension |
 * | Corel Envoy                               | application/envoy                       | evy            |
 * | fractal image file                        | application/fractals                    | fif            |
 * | Windows print spool file                  | application/futuresplash                | spl            |
 * | HTML application                          | application/hta                         | hta            |
 * | Atari ST Program                          | application/internet-property-stream    | acx            |
 * | BinHex encoded file                       | application/mac-binhex40                | hqx            |
 * | Word document                             | application/msword                      | doc            |
 * | Word document template                    | application/msword                      | dot            |
 * | application/octet-stream                  | *                                       |                |
 * | binary disk image                         | application/octet-stream                | bin            |
 * | Java class file                           | application/octet-stream                | class          |
 * | Disk Masher image                         | application/octet-stream                | dms            |
 * | executable file                           | application/octet-stream                | exe            |
 * | LHARC compressed archive                  | application/octet-stream                | lha            |
 * | LZH compressed file                       | application/octet-stream                | lzh            |
 * | CALS raster image                         | application/oda                         | oda            |
 * | ActiveX script                            | application/olescript                   | axs            |
 * | Acrobat file                              | application/pdf                         | pdf            |
 * | Outlook profile file                      | application/pics-rules                  | prf            |
 * | certificate request file                  | application/pkcs10                      | p10            |
 * | certificate revocation list file          | application/pkix-crl                    | crl            |
 * | Adobe Illustrator file                    | application/postscript                  | ai             |
 * | postscript file                           | application/postscript                  | eps            |
 * | postscript file                           | application/postscript                  | ps             |
 * | rich text format file                     | application/rtf                         | rtf            |
 * | set payment initiation                    | application/set-payment-initiation      | setpay         |
 * | set registration initiation               | application/set-registration-initiation | setreg         |
 * | Excel Add-in file                         | application/vnd.ms-excel                | xla            |
 * | Excel chart                               | application/vnd.ms-excel                | xlc            |
 * | Excel macro                               | application/vnd.ms-excel                | xlm            |
 * | Excel spreadsheet                         | application/vnd.ms-excel                | xls            |
 * | Excel template                            | application/vnd.ms-excel                | xlt            |
 * | Excel worspace                            | application/vnd.ms-excel                | xlw            |
 * | Outlook mail message                      | application/vnd.ms-outlook              | msg            |
 * | serialized certificate store file         | application/vnd.ms-pkicertstore         | sst            |
 * | Windows catalog file                      | application/vnd.ms-pkiseccat            | cat            |
 * | stereolithography file                    | application/vnd.ms-pkistl               | stl            |
 * | PowerPoint template                       | application/vnd.ms-powerpoint           | pot            |
 * | PowerPoint slide show                     | application/vnd.ms-powerpoint           | pps            |
 * | PowerPoint presentation                   | application/vnd.ms-powerpoint           | ppt            |
 * | Microsoft Project file                    | application/vnd.ms-project              | mpp            |
 * | WordPerfect macro                         | application/vnd.ms-works                | wcm            |
 * | Microsoft Works database                  | application/vnd.ms-works                | wdb            |
 * | Microsoft Works spreadsheet               | application/vnd.ms-works                | wks            |
 * | Microsoft Works word processsor document  | application/vnd.ms-works                | wps            |
 * | Windows help file                         | application/winhlp                      | hlp            |
 * | binary CPIO archive                       | application/x-bcpio                     | bcpio          |
 * | computable document format file           | application/x-cdf                       | cdf            |
 * | Unix compressed file                      | application/x-compress                  | z              |
 * | gzipped tar file                          | application/x-compressed                | tgz            |
 * | Unix CPIO archive                         | application/x-cpio                      | cpio           |
 * | Photoshop custom shapes file              | application/x-csh                       | csh            |
 * | Kodak RAW image file                      | application/x-director                  | dcr            |
 * | Adobe Director movie                      | application/x-director                  | dir            |
 * | Macromedia Director movie                 | application/x-director                  | dxr            |
 * | device independent format file            | application/x-dvi                       | dvi            |
 * | Gnu tar archive                           | application/x-gtar                      | gtar           |
 * | Gnu zipped archive                        | application/x-gzip                      | gz             |
 * | hierarchical data format file             | application/x-hdf                       | hdf            |
 * | internet settings file                    | application/x-internet-signup           | ins            |
 * | IIS internet service provider settings    | application/x-internet-signup           | isp            |
 * | ARC+ architectural file                   | application/x-iphone                    | iii            |
 * | JavaScript file                           | application/x-javascript                | js             |
 * | LaTex document                            | application/x-latex                     | latex          |
 * | Microsoft Access database                 | application/x-msaccess                  | mdb            |
 * | Windows CardSpace file                    | application/x-mscardfile                | crd            |
 * | CrazyTalk clip file                       | application/x-msclip                    | clp            |
 * | dynamic link library                      | application/x-msdownload                | dll            |
 * | Microsoft media viewer file               | application/x-msmediaview               | m13            |
 * | Steuer2001 file                           | application/x-msmediaview               | m14            |
 * | multimedia viewer book source file        | application/x-msmediaview               | mvb            |
 * | Windows meta file                         | application/x-msmetafile                | wmf            |
 * | Microsoft Money file                      | application/x-msmoney                   | mny            |
 * | Microsoft Publisher file                  | application/x-mspublisher               | pub            |
 * | Turbo Tax tax schedule list               | application/x-msschedule                | scd            |
 * | FTR media file                            | application/x-msterminal                | trm            |
 * | Microsoft Write file                      | application/x-mswrite                   | wri            |
 * | computable document format file           | application/x-netcdf                    | cdf            |
 * | Mastercam numerical control file          | application/x-netcdf                    | nc             |
 * | MSX computers archive format              | application/x-perfmon                   | pma            |
 * | performance monitor counter file          | application/x-perfmon                   | pmc            |
 * | process monitor log file                  | application/x-perfmon                   | pml            |
 * | Avid persistant media record file         | application/x-perfmon                   | pmr            |
 * | Pegasus Mail draft stored message         | application/x-perfmon                   | pmw            |
 * | personal information exchange file        | application/x-pkcs12                    | p12            |
 * | PKCS #12 certificate file                 | application/x-pkcs12                    | pfx            |
 * | PKCS #7 certificate file                  | application/x-pkcs7-certificates        | p7b            |
 * | software publisher certificate file       | application/x-pkcs7-certificates        | spc            |
 * | certificate request response file         | application/x-pkcs7-certreqresp         | p7r            |
 * | PKCS #7 certificate file                  | application/x-pkcs7-mime                | p7c            |
 * | digitally encrypted message               | application/x-pkcs7-mime                | p7m            |
 * | digitally signed email message            | application/x-pkcs7-signature           | p7s            |
 * | Bash shell script                         | application/x-sh                        | sh             |
 * | Unix shar archive                         | application/x-shar                      | shar           |
 * | Flash file                                | application/x-shockwave-flash           | swf            |
 * | Stuffit archive file                      | application/x-stuffit                   | sit            |
 * | system 5 release 4 CPIO file              | application/x-sv4cpio                   | sv4cpio        |
 * | system 5 release 4 CPIO checksum data     | application/x-sv4crc                    | sv4crc         |
 * | consolidated Unix file archive            | application/x-tar                       | tar            |
 * | Tcl script                                | application/x-tcl                       | tcl            |
 * | LaTeX source document                     | application/x-tex                       | tex            |
 * | LaTeX info document                       | application/x-texinfo                   | texi           |
 * | LaTeX info document                       | application/x-texinfo                   | texinfo        |
 * | unformatted manual page                   | application/x-troff                     | roff           |
 * | Turing source code file                   | application/x-troff                     | t              |
 * | TomeRaider 2 ebook file                   | application/x-troff                     | tr             |
 * | Unix manual                               | application/x-troff-man                 | man            |
 * | readme text file                          | application/x-troff-me                  | me             |
 * | 3ds Max script file                       | application/x-troff-ms                  | ms             |
 * | uniform standard tape archive format file | application/x-ustar                     | ustar          |
 * | source code                               | application/x-wais-source               | src            |
 * | internet security certificate             | application/x-x509-ca-cert              | cer            |
 * | security certificate                      | application/x-x509-ca-cert              | crt            |
 * | DER certificate file                      | application/x-x509-ca-cert              | der            |
 * | public key security object                | application/ynd.ms-pkipko               | pko            |
 * | zipped file                               | application/zip                         | zip            |
 * | Sound Files                               |                                         |                |
 * | Application                               | MIME Type                               | File Extension |
 * | audio file                                | audio/basic                             | au             |
 * | sound file                                | audio/basic                             | snd            |
 * | midi file                                 | audio/mid                               | mid            |
 * | media processing server studio            | audio/mid                               | rmi            |
 * | MP3 file                                  | audio/mpeg                              | mp3            |
 * | audio interchange file format             | audio/x-aiff                            | aif            |
 * | compressed audio interchange file         | audio/x-aiff                            | aifc           |
 * | audio interchange file format             | audio/x-aiff                            | aiff           |
 * | media playlist file                       | audio/x-mpegurl                         | m3u            |
 * | Real Audio file                           | audio/x-pn-realaudio                    | ra             |
 * | Real Audio metadata file                  | audio/x-pn-realaudio                    | ram            |
 * | WAVE audio file                           | audio/x-wav                             | wav            |
 * | Image Files                               |                                         |                |
 * | Application                               | MIME Type                               | File Extension |
 * | Bitmap                                    | image/bmp                               | bmp            |
 * | compiled source code                      | image/cis-cod                           | cod            |
 * | graphic interchange format                | image/gif                               | gif            |
 * | image file                                | image/ief                               | ief            |
 * | JPEG image                                | image/jpeg                              | jpe            |
 * | JPEG image                                | image/jpeg                              | jpeg           |
 * | JPEG image                                | image/jpeg                              | jpg            |
 * | JPEG file interchange format              | image/pipeg                             | jfif           |
 * | scalable vector graphic                   | image/svg+xml                           | svg            |
 * | TIF image                                 | image/tiff                              | tif            |
 * | TIF image                                 | image/tiff                              | tiff           |
 * | Sun raster graphic                        | image/x-cmu-raster                      | ras            |
 * | Corel metafile exchange image file        | image/x-cmx                             | cmx            |
 * | icon                                      | image/x-icon                            | ico            |
 * | portable any map image                    | image/x-portable-anymap                 | pnm            |
 * | portable bitmap image                     | image/x-portable-bitmap                 | pbm            |
 * | portable graymap image                    | image/x-portable-graymap                | pgm            |
 * | portable pixmap image                     | image/x-portable-pixmap                 | ppm            |
 * | RGB bitmap                                | image/x-rgb                             | rgb            |
 * | X11 bitmap                                | image/x-xbitmap                         | xbm            |
 * | X11 pixmap                                | image/x-xpixmap                         | xpm            |
 * | X-Windows dump image                      | image/x-xwindowdump                     | xwd            |
 * | Mail Message Files                        |                                         |                |
 * | Application                               | MIME Type                               | File Extension |
 * | MHTML web archive                         | message/rfc822                          | mht            |
 * | MIME HTML file                            | message/rfc822                          | mhtml          |
 * | Windows Live Mail newsgroup file          | message/rfc822                          | nws            |
 * | Text Files                                |                                         |                |
 * | Application                               | MIME Type                               | File Extension |
 * | Cascading Style Sheet                     | text/css                                | css            |
 * | H.323 internet telephony file             | text/h323                               | 323            |
 * | HTML file                                 | text/html                               | htm            |
 * | HTML file                                 | text/html                               | html           |
 * | Exchange streaming media file             | text/html                               | stm            |
 * | NetMeeting user location service file     | text/iuls                               | uls            |
 * | BASIC source code file                    | text/plain                              | bas            |
 * | C/C++ source code file                    | text/plain                              | c              |
 * | C/C++/Objective C header file             | text/plain                              | h              |
 * | text file                                 | text/plain                              | txt            |
 * | rich text file                            | text/richtext                           | rtx            |
 * | Scitext continuous tone file              | text/scriptlet                          | sct            |
 * | tab separated values file                 | text/tab-separated-values               | tsv            |
 * | hypertext template file                   | text/webviewhtml                        | htt            |
 * | HTML component file                       | text/x-component                        | htc            |
 * | TeX font encoding file                    | text/x-setext                           | etx            |
 * | vCard file                                | text/x-vcard                            | vcf            |
 * | Video Files                               |                                         |                |
 * | Application                               | MIME Type                               | File Extension |
 * | MPEG-2 audio file                         | video/mpeg                              | mp2            |
 * | MPEG-2 audio file                         | video/mpeg                              | mpa            |
 * | MPEG movie file                           | video/mpeg                              | mpe            |
 * | MPEG movie file                           | video/mpeg                              | mpeg           |
 * | MPEG movie file                           | video/mpeg                              | mpg            |
 * | MPEG-2 video stream                       | video/mpeg                              | mpv2           |
 * | MPEG-4                                    | video/mp4                               | mp4            |
 * | Apple QuickTime movie                     | video/quicktime                         | mov            |
 * | Apple QuickTime movie                     | video/quicktime                         | qt             |
 * | Logos library system file                 | video/x-la-asf                          | lsf            |
 * | streaming media shortcut                  | video/x-la-asf                          | lsx            |
 * | advanced systems format file              | video/x-ms-asf                          | asf            |
 * | ActionScript remote document              | video/x-ms-asf                          | asr            |
 * | Microsoft ASF redirector file             | video/x-ms-asf                          | asx            |
 * | audio video interleave file               | video/x-msvideo                         | avi            |
 * | Apple QuickTime movie                     | video/x-sgi-movie                       | movie          |
 * | Virtual World Files                       |                                         |                |
 * | Application                               | MIME Type                               | File Extension |
 * | Flare decompiled actionscript file        | x-world/x-vrml                          | flr            |
 * | VRML file                                 | x-world/x-vrml                          | vrml           |
 * | VRML world                                | x-world/x-vrml                          | wrl            |
 * | compressed VRML world                     | x-world/x-vrml                          | wrz            |
 * | 3ds max XML animation file                | x-world/x-vrml                          | xaf            |
 * | Reality Lab 3D image file                 | x-world/x-vrml                          | xof            |
 * --------------------------------------------------------------------------------------------------------
 */
@Component({
  selector: "app-file-uploader",
  templateUrl: "./file-uploader.component.html",
  styleUrls: ["./file-uploader.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true,
    }]
})
export class FileUploaderComponent implements ControlValueAccessor, Validator {

  /**
   * Mime types of the file to be uploaded refer above table
   */
  @Input() accept: string[] = ["*/*"];

  /**
   * To enable multiple file selection
   */
  @Input() multiple = false;

  /**
   * Text to be shown on the button
   */
  @Input() uploadButtonText: string;

  /**
   * Text to be shown as info label
   */
  @Input() infoLabel: string;

  @Input() enablePreview = false;

  /**
  * To identify the file for dimension check
  */
  @Input() fileDimensionRatio?: FileDimension;

  errors: string[] = [];

  dimensionError = [];
  dimensionErrorMsg: string = "";

  private data: FileDetails[] = [];

  isDisabled: boolean;

  private validationErrors: any;


  @ViewChild("fileinput", { static: false })
  private fileInputVariable: ElementRef;

  private propagateChange = (_: any) => { };

  constructor(private fileProcessingService: FileProcessingService,
    private validatorService: FileDimensionValidatorService,
    private translate: TranslateService) {
  }

  writeValue(obj: any): void {
    if (obj) {
      if (this.multiple) {
        this.data = obj;
      } else {
        this.data = [obj];
        this.isDisabled = true;
      }
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors {
    return (!this.validationErrors) ? null : this.errors;
  }

  registerOnValidatorChange?(fn: () => void): void {

  }

  onChange($event: Event): void {
    this.readFiles($event);
    this.reset();
  }

  readFiles($event: any): void {
    const files: FileList = $event.target.files;
    this.fileProcessingService.getFileDetails(files).then((fileDetails: FileDetails[]) => {
      this.readFileIsValidDimension(fileDetails);
    });
  }

  readFileIsValidDimension(fileDetails) {
    if (!this.multiple) {
      this.isDisabled = true;
    }
    this.data.push(...fileDetails);
    this.propagateChange(this.data);
  }

  reset() {
    this.fileInputVariable.nativeElement.value = "";
  }

  removFile(data) {
    const index = this.data.findIndex(item => item.url === data.url);
    let deletedImage = { ...this.data[index] };

    if (!this.multiple) {
      this.isDisabled = false;
    }

    if (index > -1) {
      if (this.multiple && deletedImage.id) {
        deletedImage.isDeleted = true;
        this.data.push(deletedImage);
        this.data.splice(index, 1);
        this.propagateChange([]);
        return;
      }
      this.data.splice(index, 1);
      this.propagateChange(this.data);
    }

  }
}
