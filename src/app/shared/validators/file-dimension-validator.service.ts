import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FileDimensionValidatorService {

  constructor(private translateService: TranslateService) { }

  dimensionValidator(fileDimension = null): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      if (fileDimension && control.value && control.value.length) {
        let fileDimensionKeys = [];

        for (const key in fileDimension) {
          fileDimensionKeys.push(key);
          // console.log("key==> ", key);

        }

        // Todo: min or max available case
        if (this.getStartsWithKey(fileDimensionKeys, "min") || this.getStartsWithKey(fileDimensionKeys, "max")) {

          // Todo: common exception case
          if (this.getStartsWithKey(fileDimensionKeys, "height") || this.getStartsWithKey(fileDimensionKeys, "width")) {
            return { dimensionError: { error: this.translateService.instant("common.invalid_file.common_invalid") } };
          }

          for (const fileKey in control.value) {

            if (this.getStartsWithKey(fileDimensionKeys, "min") && this.getStartsWithKey(fileDimensionKeys, "max")) {
              if (((control.value[fileKey].width < fileDimension.minWidth) || (control.value[fileKey].width > fileDimension.maxWidth)) ||
                ((control.value[fileKey].height < fileDimension.minHeight) || (control.value[fileKey].height > fileDimension.maxHeight))) {

                const errorMessage = this.translateService.instant("common.invalid_file.invalid_image_prefix")
                  + fileDimension.minWidth + "x" + fileDimension.minHeight
                  + this.translateService.instant("common.invalid_file.invalid_image_sufix")
                  + fileDimension.maxWidth + "x" + fileDimension.maxHeight;

                control.value[fileKey].dimensionError = true;
                control.value[fileKey].dimensionErrorMsg = errorMessage;

                return { dimensionError: { error: errorMessage } };
              }
            }

            if (this.getStartsWithKey(fileDimensionKeys, "min")) {
              if ((control.value[fileKey].width < fileDimension.minWidth) &&
                (control.value[fileKey].height < fileDimension.minHeight)) {

                const errorMessage = this.translateService.instant("common.invalid_file.invalid_min_dimension") +
                  + fileDimension.minWidth + "x" + fileDimension.minHeight
                  + this.translateService.instant("common.invalid_file.invalid_dimension_description");
                control.value[fileKey].dimensionError = true;
                control.value[fileKey].dimensionErrorMsg = errorMessage;
                return { dimensionError: { error: errorMessage } };
              }
            }

            if (this.getStartsWithKey(fileDimensionKeys, "max")) {
              if ((control.value[fileKey].width > fileDimension.maxWidth) &&
                (control.value[fileKey].height > fileDimension.maxHeight)) {

                const errorMessage = this.translateService.instant("common.invalid_file.invalid_max_dimension") +
                  + fileDimension.minWidth + "x" + fileDimension.minHeight
                  + this.translateService.instant("common.invalid_file.invalid_dimension_description");
                control.value[fileKey].dimensionError = true;
                control.value[fileKey].dimensionErrorMsg = errorMessage;
                return { dimensionError: { error: errorMessage } };
              }
            }

          }

          return null;
        }

        if (!this.getStartsWithKey(fileDimensionKeys, "height") || !this.getStartsWithKey(fileDimensionKeys, "width")) {
          return { dimensionError: { error: this.translateService.instant("common.invalid_file.common_invalid") } };
        }

        if (this.getStartsWithKey(fileDimensionKeys, "height") && this.getStartsWithKey(fileDimensionKeys, "width")) {
          for (const fileKey in control.value) {
            if ((control.value[fileKey].width !== fileDimension.width) &&
              (control.value[fileKey].height !== fileDimension.height)) {
              const errorMessage = this.translateService.instant("common.invalid_file.invalid_icon_prefix")
                + fileDimension.width + "x" + fileDimension.height
                + this.translateService.instant("common.invalid_file.invalid_icon_sufix");
              control.value[fileKey].dimensionError = true;
              control.value[fileKey].dimensionErrorMsg = errorMessage;
              return { dimensionError: { error: errorMessage } };
            }
          }

          return null;
        }
      }
      return null;
    };
  }

  getStartsWithKey(fileDimensionKeys, value) {
    return fileDimensionKeys.find(substring => (substring).startsWith(value))
  }
}
