<template>
  <div v-if="isLoaded" class="d-flex flex-wrap">
    <template v-if="variant === 'feather'">
      <AlertCircleIcon v-if="icon === 'alert-circle'" :size="size" />
      <ArrowRightIcon v-else-if="icon === 'arrow-right'" :size="size" />
      <ArchiveIcon v-else-if="icon === 'archive'" :size="size" />
      <AtSignIcon v-else-if="icon === 'at-sign'" :size="size" />
      <AwardIcon v-else-if="icon === 'award'" :size="size" />
      <BookIcon v-else-if="icon === 'book'" :size="size" />
      <BookmarkIcon v-else-if="icon === 'bookmark'" :size="size" />
      <CalendarIcon v-else-if="icon === 'calendar'" :size="size" />
      <ClockIcon v-else-if="icon === 'clock'" :size="size" />
      <CompassIcon v-else-if="icon === 'compass'" :size="size" />
      <DownloadIcon v-else-if="icon === 'download'" :size="size" />
      <ExternalLinkIcon v-else-if="icon === 'external-link'" :size="size" />
      <FileTextIcon v-else-if="icon === 'file-text'" :size="size" />
      <FileIcon v-else-if="icon === 'file'" :size="size" />
      <FlagIcon v-else-if="icon === 'flag'" :size="size" />
      <FolderIcon v-else-if="icon === 'folder'" :size="size" />
      <GlobeIcon v-else-if="icon === 'globe'" :size="size" />
      <GridIcon v-else-if="icon === 'grid'" :size="size" />
      <HashIcon v-else-if="icon === 'hash'" :size="size" />
      <HelpCircleIcon v-else-if="icon === 'help-circle'" :size="size" />
      <HomeIcon v-else-if="icon === 'home'" :size="size" />
      <InfoIcon v-else-if="icon === 'info'" :size="size" />
      <MailIcon v-else-if="icon === 'mail'" :size="size" />
      <PocketIcon v-else-if="icon === 'pocket'" :size="size" />
      <PrinterIcon v-else-if="icon === 'printer'" :size="size" />
      <SearchIcon v-else-if="icon === 'search'" :size="size" />
      <SettingsIcon v-else-if="icon === 'settings'" :size="size" />
      <ShareIcon v-else-if="icon === 'share'" :size="size" />
      <Share2Icon v-else-if="icon === 'share-2'" :size="size" />
      <StarIcon v-else-if="icon === 'star'" :size="size" />
      <TagIcon v-else-if="icon === 'tag'" :size="size" />
    </template>
    <template v-else>
      <v-icon :small="small">
        {{ icon }}
      </v-icon>
    </template>
  </div>
</template>

<script>
import loading from '@/mixins/loading'
import {
  ArrowRightIcon,
  AlertCircleIcon,
  ArchiveIcon,
  AtSignIcon,
  AwardIcon,
  BookIcon,
  BookmarkIcon,
  CalendarIcon,
  ClockIcon,
  CompassIcon,
  DownloadIcon,
  ExternalLinkIcon,
  FileTextIcon,
  FileIcon,
  FlagIcon,
  FolderIcon,
  GlobeIcon,
  GridIcon,
  HashIcon,
  HelpCircleIcon,
  HomeIcon,
  InfoIcon,
  MailIcon,
  PocketIcon,
  PrinterIcon,
  SearchIcon,
  SettingsIcon,
  ShareIcon,
  Share2Icon,
  StarIcon,
  TagIcon
} from 'vue-feather-icons'

export default {
  components: {
    ArrowRightIcon,
    AlertCircleIcon,
    ArchiveIcon,
    AtSignIcon,
    AwardIcon,
    BookIcon,
    BookmarkIcon,
    CalendarIcon,
    ClockIcon,
    CompassIcon,
    DownloadIcon,
    ExternalLinkIcon,
    FileTextIcon,
    FileIcon,
    FlagIcon,
    FolderIcon,
    GlobeIcon,
    GridIcon,
    HashIcon,
    HelpCircleIcon,
    HomeIcon,
    InfoIcon,
    MailIcon,
    PocketIcon,
    PrinterIcon,
    SearchIcon,
    SettingsIcon,
    ShareIcon,
    Share2Icon,
    StarIcon,
    TagIcon
  },
  mixins: [loading],
  props: {
    size: {
      type: [String, Number],
      default: '1.3x'
    },
    variant: {
      type: String,
      default: 'feather'
    },
    icon: {
      type: String,
      default: ''
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>
